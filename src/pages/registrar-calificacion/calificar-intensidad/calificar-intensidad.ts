import {
	Component
} from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams
} from 'ionic-angular';

/**
 * Generated class for the CalificarIntensidadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-calificar-intensidad',
	templateUrl: 'calificar-intensidad.html',
})
export class CalificarIntensidadPage {

	intensidad = {}
	calificacionInicial = 0
	calificacionFinal = 0

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.intensidad = this.navParams.get('intensidad')
		this.calificacionInicial = this.navParams.get('intensidad').rangos[0].rango_inicial
		this.calificacionFinal = this.navParams.get('intensidad').rangos[0].rango_final
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CalificarIntensidadPage')
		console.log(this.calificacionFinal)
	}

}
