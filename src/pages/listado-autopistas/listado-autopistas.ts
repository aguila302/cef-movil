import {
	Component,
	NgZone
} from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams
} from 'ionic-angular'
import {
	Storage
} from '@ionic/storage'
import {
	AutopistasApiProvider
} from '../../providers/autopistas-api/autopistas-api'
import {
	AutopistasProvider
} from '../../providers/aplicacion/autopistas'


@IonicPage()
@Component({
	selector: 'page-listado-autopistas',
	templateUrl: 'listado-autopistas.html',
})
export class ListadoAutopistasPage {
	usuario: number = 0
	access_token: string = ''
	autopistas = []
	constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
		private autopistasApi: AutopistasApiProvider, private zone: NgZone,
		private autopistasProvider: AutopistasProvider) {

		this.usuario = navParams.get('usuario')
		this.access_token = navParams.get('access_token')
	}

	ionViewDidLoad() {
		this.usuario && this.access_token ? this.obtenerAutopistasApi() : this.obtenerAutopistasOrigenDeDatos()
	}

	/* Resolver al endpoint del api para obtener el listado de autopistas. */
	obtenerAutopistasApi = () => {
		/* Obtener datos del usuario conectado. */
		this.storage.get('auth').then((usuario) => {
			this.autopistasApi.obtenerAutopistas(usuario).then((response) => {
				/* Registrar autopistas en el origen de datos. */
				this.autopistasProvider.registrarAutopistas(usuario, response)
					.then((response) => {
						this.zone.run(() => {
							this.autopistas = response
						})
					})

			}).catch((error) => {
				console.error.bind(error)
			})
		}).catch((error) => {
			console.error.bind(error)
		})
	}

	/* Obtener un listado de autopistas de un usuario en el origen de datros. */
	obtenerAutopistasOrigenDeDatos = () => {
		console.log('obtener autopistas del orgen de datos')
		this.storage.get('auth').then((response) => {
			this.autopistasProvider.obtenerAutopistasOrigenDeDatos(response).then((response) => {
				this.zone.run(() => {
					this.autopistas = response
				})
			})
		})
	}
}
