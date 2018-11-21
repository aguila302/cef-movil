import {
	Component,
	ViewChild
} from '@angular/core';
import {
	Nav,
	Platform
} from 'ionic-angular';
import {
	StatusBar
} from '@ionic-native/status-bar';
import {
	SplashScreen
} from '@ionic-native/splash-screen';

import {
	HomePage
} from '../pages/home/home';
import {
	ListPage
} from '../pages/list/list'
import {
	Storage
} from '@ionic/storage'


@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	email: string = ''
	name: string = ''

	rootPage: any = '';

	pages: Array < {
		title: string,
		component: any
	} > ;

	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
		private storage: Storage) {

		/* Obtiene usuario logueado en storage. */
		this.storage.get('auth').then((response) => {
			if (response) {
				/* Si hay un usuario conectado lo dirigimos al inicio de la aplicación */
				console.log('si hay un usuario activo')

				this.email = response.email
				this.name = response.name
				this.rootPage = 'ListadoAutopistasPage'

			} else {
				/* Si no hay un usuario conectado lo dirigimos al template para iniciar seeión */
				console.log('no hay un usuario activo')
				this.rootPage = 'LoginPage'
			}
		})

		this.initializeApp();

		// used for an example of ngFor and navigation
		/*this.pages = [{
			title: 'Home',
			component: HomePage
		}, {
			title: 'List',
			component: ListPage
		}];
		*/
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// this.platform.registerBackButtonAction(function(e) {
			// 	console.log('');

			// });
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}
	myHandlerFunction() {
		console.log('asas');

	}

	openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component);
	}

	/* Salir de la aplicación. */
	cerrarSesion() {
		/* Borramos el storage de un usuario conectado. */
		this.storage.remove('auth').then((response) => {
			this.nav.setRoot('LoginPage', {}, {
				animate: true,
				animation: 'ios-transition',
				direction: 'back'
			})
		})
	}
}