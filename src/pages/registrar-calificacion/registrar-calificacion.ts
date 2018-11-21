/**
 * Clase generada para el componente de RegistrarCalificacionPage.
 * Autor: Alfonso Hernández Montoya.
 * Fecha de creación: 01/08/2018.
 * Descripción: Clase para la funcionalidad de registrar calificaciones de un camino.
 * Modifico: Alfonso Hernández Montoya.
 * Fecha modificación: 01/08/2018.
 */

import {
	NgForm
} from '@angular/forms'

import {
	Component,
} from '@angular/core'
import {
	IonicPage,
	NavController,
	NavParams,
	ModalController,
	ToastController,
	LoadingController,
	ViewController,
	AlertController,
	Platform
} from 'ionic-angular'
import {
	AutopistasProvider
} from '../../providers/aplicacion/autopistas'
import * as collect from 'collect.js/dist'
import * as uuid from 'uuid/v5'

@IonicPage()
@Component({
	selector: 'page-registrar-calificacion',
	templateUrl: 'registrar-calificacion.html',
})
export class RegistrarCalificacionPage {

	reporteCalificacionesWeb = []
	autopistaId: number = 0
	nombreAutopista: string = ''
	calificacionFinal: number = 0.0
	autopista = {}
	elementos = []
	cuerpos = []
	calificacionTramo: number = 0
	secciones = []
	filtro = {
		cuerpo: '',
		seccion: '',
	}
	submit: boolean = true

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private autopistasProvider: AutopistasProvider, public modal: ModalController,
		private toast: ToastController, public loading: LoadingController, public view: ViewController,
		private alertCtrl: AlertController, public platform: Platform) {

		/* Obtener información de la autopista actual. */
		this.autopistaId = this.navParams.get('autopista').id
		this.nombreAutopista = this.navParams.get('autopista').descripcion
		this.autopista = this.navParams.get('autopista')
	}

	ionViewCanLeave() {
		console.log(this.elementos)
		this.elementos.map((item) => {
			console.log(item.calificacionXElemento)
			if (item.calificacionXElemento > 0) {
				let alert = this.alertCtrl.create({
					title: 'Confirm purchase',
					message: 'Do you want to buy this book?',
					buttons: [{
						text: 'Cancel',
						role: 'cancel',
						handler: () => {
							console.log('Cancel clicked');
						}
					}, {
						text: 'Buy',
						handler: () => {
							console.log('Buy clicked');
						}
					}]
				});
				alert.present();

			}

		})

	}
	ionViewDidLoad() {
		/* Obtener listado de secciones. */
		this.autopistasProvider.obtenerSecciones(this.autopistaId).then((secciones) => {
				this.secciones = secciones
			})
			/* Obtener listado de cuerpos. */
		this.autopistasProvider.obtenerCuerpos().then((cuerpos) => {
			this.cuerpos = cuerpos
		})


		/* Obtener listado de elementos. */
		this.autopistasProvider.obtenerElementos().then((elementosDb) => {
			for (let elemento of elementosDb) {
				/* Obtener defectos por cada elemento. */
				this.autopistasProvider.obtenerefectos(elemento.id).then((defecto) => {
					this.elementos.push({
						id: elemento.id,
						descripcion: elemento.descripcion,
						calificacionXElemento: 0.0,
						defectos: defecto,
					})
				})
			}
		})

	}

	/* Activar componentes de calificación. */
	activarComponente = (form: NgForm) => {
		this.submit = false
	}

	/* Muestra las intensidades de un elemento a calificar. */
	muestraIntensidades = (elemento, defecto, defectoDescripcion) => {
		/* Crear un modal para las intensidades. */
		let modalIntensidades = this.modal.create('ListadoIntensidadesPage', {
			elemento: elemento,
			defecto: defecto,
			defectoDescripcion: defectoDescripcion
		})

		/*Al cerrar el cuadro modal obtener valores seleccionado. */
		modalIntensidades.onDidDismiss((intensidad) => {
			intensidad ? this.calificarIntensidad(intensidad) : ''
		});

		/* Mostrar el cuadro modal. */
		modalIntensidades.present()
	}

	/* Calificar intensidad seleccionada. */
	calificarIntensidad = (intensidad) => {
		let modalCalificcion = this.modal.create('CalificarIntensidadPage', {
			intensidad
		})

		/* Al cerrar el cuadro modal obtener valor de la calificación por defecto seleccionado. */
		modalCalificcion.onDidDismiss((data) => {
			let elementoCalificado = []
			let sumaCalificacion: number = 0
			data.calificacion !== '' ? (
				/* Si hay calificación para dicho defecto obtener su elemento correspondiente a esta calificación */
				data ? (
					elementoCalificado = this.elementos.filter(function(elemento) {
						return elemento.id === data.intensidad.elemento_id
					}),

					elementoCalificado.map((elemento) => {
						let suma: number = 0
						elemento['valorCalificacionMinuendo'] = elemento.defectos[0].calificacion

						let excluido = collect(elemento.defectos.slice(1))
						elemento.defectos.map((defecto) => {
							/* Obtener defecto a calificar. */
							if (defecto.id == data.intensidad.rangos[0].defecto_id) {
								if (defecto.calificacion != 0) {
									defecto.calificacion = 0
								}
								defecto.intensidad = intensidad.id
									/* Asignar calificación a un defecto. */
								defecto.calificacion = parseFloat(data.calificacion)
							}
						})

						suma = excluido.sum('calificacion')
						sumaCalificacion = elemento.defectos[0].calificacion - suma

						elemento.calificacionXElemento = sumaCalificacion
					})
				) : ''
			) : ''
		})

		/* Mostrar el cuadro modal. */
		modalCalificcion.present()
	}

	/* Guardar las calificaciones de los elementos en el origen de datos. */
	guardarCalificaciones = () => {
		/* Verifica si hay informaciòn almacenada en el origen de datos por secciòn y cuerpo. */
		this.autopistasProvider.verificarCalificacionesSeccionCuerpo(this.filtro).then((response) => {

			let loading = this.loading.create({
				content: 'Por favor espera...'
			});

			loading.present()

			let fechaHoraRegistro: string = ''
			for (let elemento of this.elementos) {
				for (let defecto of elemento.defectos) {
					setTimeout(() => {
						/* Generamos un uuid para guardar la calificacion. */
						fechaHoraRegistro = new Date().getTime().toString()
						this.autopistasProvider.guardarCalificaciones(this.autopistaId, this.filtro.cuerpo,
							this.filtro.seccion, elemento.id, defecto.id, defecto.intensidad, defecto.calificacion, uuid(fechaHoraRegistro, uuid.URL))

					}, 2000);
				}
			}

			setTimeout(() => {
				loading.dismiss()
				this.reporteadorWeb()
				this.mostrarConfirmacion()
				this.reporteCalificacionesWeb.splice(0, this.reporteCalificacionesWeb.length)
					// this.filtro = {
					// 	cuerpo: '',
					// 	seccion: '',
					// }
			}, 4000)
		})

	}

	/*
	 * Mostrar mensaje de confirmación.
	 */
	mostrarConfirmacion = () => {
		let toast = this.toast.create({
			message: 'Las calificaciones se guardaron exitosamente',
			duration: 3000,
			position: 'middle'
		});

		toast.present();
	}

	/* Organizar información para reporte web. */
	reporteadorWeb = () => {
		this.autopistasProvider.obtenerSeccionReporte(this.filtro.seccion).then((response) => {
			for (let index of response) {
				/* Obtener conceptos por cada sección. */
				this.autopistasProvider.obtenerConceptosPorSeccion(this.autopista, index.id).then((conceptos) => {
					this.reporteCalificacionesWeb.push({
						id: index.id,
						seccion: index.cadenamiento_inicial_km + '-' + index.cadenamiento_inicial_m + '+' + index.cadenamiento_final_km + '-' + index.cadenamiento_final_m,
						conceptos: conceptos,
						autopista_id: this.autopistaId
					})
				})
			}
			setTimeout(() => {
				this.reporteCalificacionesWeb.length > 0 ? (
					this.reporteCalificacionesWeb.map((valores) => {

						let coleccionCalificaciones = collect(valores.conceptos)
						coleccionCalificaciones.map(item => {

							item.factores.map((factor) => {
								factor.valorParticularMinuendo = factor.valor_particular[0].valor_particular
								let excluido = factor.valor_particular.slice(1)
								let suma = collect(excluido).sum('valor_particular')
								factor.valorParticularSustraendo = suma
								factor.valorParticularDiferencia = factor.valorParticularMinuendo - factor.valorParticularSustraendo
								factor.calificacionParticular = factor.factor_elemento * factor.valorParticularDiferencia
							})
							let sumaCalificacionParticular = collect(item.factores).sum('calificacionParticular')

							item.calificacionGeneral = sumaCalificacionParticular

							item['calificacion_ponderada_tramo'] = item.valor_ponderado * item.calificacionGeneral
						});

						this.calificacionTramo = coleccionCalificaciones.sum('calificacion_ponderada_tramo')
					}),

					// Iterar el array para registrar la informacion en el origen de datos.
					//
					this.reporteCalificacionesWeb.forEach(item => {

						/* Generamos un uuid para guardar la seccion. */
						let fechaHoraRegistro = (new Date()).toLocaleDateString('eu-ES') + ' ' + (new Date()).toLocaleTimeString('eu-ES')

						this.autopistasProvider.registrarseccionesReporte(item.autopista_id, item.id, item.seccion, this.calificacionTramo, uuid(fechaHoraRegistro, uuid.URL)).then((secciones) => {
							item.conceptos.map((concepto) => {
								this.autopistasProvider.registrarConceptosReporte(secciones.insertId, concepto.id, concepto.concepto_general, concepto.valor_ponderado, concepto.calificacionGeneral)
									.then((conceptos) => {
										concepto.factores.map((factor) => {
											// console.log(factor);
											this.autopistasProvider.registrarFactoresReporte(conceptos.insertId, factor.id,
												factor.elemento, factor.factor_elemento, factor.valorParticularDiferencia, factor.calificacionParticular).then((factores) => {})
										})
									})
							})
						})
					})
				) : ''
			}, 2000)
		})
	}
}