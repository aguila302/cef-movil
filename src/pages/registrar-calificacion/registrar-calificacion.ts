import {
	NgForm
} from '@angular/forms'

import {
	Component
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

	autopista = []
	elementos = []
	cuerpos = []
	secciones = []
	filtro = {
		cuerpo: '',
		seccion: '',
	}

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private autopistasProvider: AutopistasProvider, public modal: ModalController) {

		/* Obtener información de la autopista actual. */
		this.autopista = this.navParams.get('autopista');
	}

	ionViewDidLoad() {
		/* Obtener listado de cuerpos. */
		this.autopistasProvider.obtenerCuerpos().then((cuerpos) => {
			this.cuerpos = cuerpos
		})

		/* Obtener listado de elementos. */
		this.autopistasProvider.obtenerElementos().then((elementos) => {
			this.elementos = elementos
		})

		/* Obtener listado de secciones. */
		this.autopistasProvider.obtenerSecciones(this.autopista).then((secciones) => {
			this.secciones = secciones

		})
	}
}
