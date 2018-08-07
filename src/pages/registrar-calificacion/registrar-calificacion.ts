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
	ModalController
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
	elementos = []
	cuerpos = []
	secciones = []
	filtro = {
		cuerpo: '',
		seccion: '',
	}
	submit: boolean = true

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private autopistasProvider: AutopistasProvider, public modal: ModalController) {

		/* Obtener información de la autopista actual. */
		this.autopistaId = this.navParams.get('autopista').autopista_id_api
	}

	ionViewDidLoad() {
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
						defectos: defecto
					})
				})
			}
		})

		/* Obtener listado de secciones. */
		this.autopistasProvider.obtenerSecciones(this.autopistaId).then((secciones) => {
			this.secciones = secciones
		})
	}

	/* Activar componentes de calificación. */
	activarComponente = (form: NgForm) => {
		this.submit = false
	}

	/* Muestra las intensidades de un elemento a calificar. */
	muestraIntensidades = (elemento, defecto) => {
		/* Crear un modal para las intensidades. */
		let modalIntensidades = this.modal.create('ListadoIntensidadesPage', {
			elemento: elemento,
			defecto: defecto
		})
		modalIntensidades.present()
	}
}
