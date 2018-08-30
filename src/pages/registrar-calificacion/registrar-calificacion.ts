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
	LoadingController
} from 'ionic-angular'
import {
	AutopistasProvider
} from '../../providers/aplicacion/autopistas'

@IonicPage()
@Component({
	selector: 'page-registrar-calificacion',
	templateUrl: 'registrar-calificacion.html',
})
export class RegistrarCalificacionPage {

	autopistaId: number = 0
	nombreAutopista: string = ''
	calificacionFinal: number = 0.0
	elementos = []
	cuerpos = []
	secciones = []
	filtro = {
		cuerpo: '',
		seccion: '',
	}
	submit: boolean = true

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private autopistasProvider: AutopistasProvider, public modal: ModalController,
		private toast: ToastController, public loading: LoadingController) {
		/* Obtener información de la autopista actual. */
		this.autopistaId = this.navParams.get('autopista').id
		this.nombreAutopista = this.navParams.get('autopista').descripcion
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
		modalCalificcion.onDidDismiss(data => {
			let elementoCalificado = []
			let sumaCalificacion: number = 0

			/* Si hay calificación para dicho defecto obtener su elemento correspondiente a esta calificación */
			data ? (
				elementoCalificado = this.elementos.filter(function(elemento) {
					return elemento.id === data.intensidad.elemento_id
				}),

				elementoCalificado.map((elemento) => {
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
						/* Obtener calificacion total por elemento. */
						sumaCalificacion += parseFloat(defecto.calificacion)
						elemento.calificacionXElemento = sumaCalificacion
					})

				})
			) : ''
		});

		/* Mostrar el cuadro modal. */
		modalCalificcion.present()
	}

	/* Guardar las calificaciones de los elementos en el origen de datos. */
	guardarCalificaciones = () => {
		let loading = this.loading.create({
			content: 'Por favor espera...'
		});

		loading.present()

		setTimeout(() => {
			for (let elemento of this.elementos) {
				for (let defecto of elemento.defectos) {
					this.autopistasProvider.guardarCalificaciones(this.autopistaId, this.filtro.cuerpo,
						this.filtro.seccion, elemento.id, defecto.id, defecto.intensidad, defecto.calificacion)
				}
			}
		}, 1000);

		setTimeout(() => {
			loading.dismiss()
			this.mostrarConfirmacion()
			this.filtro = {
				cuerpo: '',
				seccion: '',
			}
		}, 4000)
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
}
