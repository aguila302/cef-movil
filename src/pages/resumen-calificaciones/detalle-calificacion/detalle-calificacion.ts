import {
	Component
} from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams
} from 'ionic-angular';

/**
 * Generated class for the DetalleCalificacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-detalle-calificacion',
	templateUrl: 'detalle-calificacion.html',
})
export class DetalleCalificacionPage {
	calificacion = {}
	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.calificacion = navParams.get('calificacion')
		console.log(this.calificacion);

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad DetalleCalificacionPage');
	}

}
