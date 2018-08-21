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

/**
 * Generated class for the RegistrarCalificacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
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
		private autopistasProvider: AutopistasProvider, public modal: ModalController, private toast: ToastController, public loading: LoadingController) {
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
						calificacionXElemento: 0,
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

			/* Si hay calificación para dicho defecto obtener su elemento correspondiente a esta calificación */
			data ? (
				this.elementos.filter(function(elemento) {
					return elemento.id === data.intensidad.elemento_id
				})[0].defectos.filter(function(defecto) {
					return defecto.id === data.intensidad.rangos[0].defecto_id
				})[0].calificacion = data.calificacion,

				this.elementos.map((elemento) => {
					elemento.defectos.map((defecto) => {
						return elemento.calificacionXElemento += parseFloat(defecto.calificacion)
					})
				})
			) : ''
		});

		/* Mostrar el cuadro modal. */
		modalCalificcion.present()
	}

	/* Guardar las calificaciones de los elementos en el origen de datos. */
	guardarCalificaciones = () => {
		console.log(this.elementos)

		let loading = this.loading.create({
			content: 'Por favor espera...'
		});

		loading.present()

		setTimeout(() => {
			for (let elemento of this.elementos) {
				for (let defecto of elemento.defectos) {
					this.autopistasProvider.guardarCalificaciones(this.autopistaId, this.filtro.cuerpo, this.filtro.seccion, elemento.id, defecto.id)
				}
			}
		}, 1000);

		setTimeout(() => {
			loading.dismiss()
			this.mostrarConfirmacion()
		}, 4000)

	}

	/**
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
