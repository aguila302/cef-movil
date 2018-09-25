import {
	Component
} from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	ViewController
} from 'ionic-angular';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-popover',
	templateUrl: 'popover.html',
})
export class PopoverPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PopoverPage');
	}

	/**
	 * Funcion para sincronizar los levantamientos de una autopista.
	 */
	async sincronizar() {
		this.viewCtrl.dismiss({
			sincronzar: true
		});
	}

}