import {
	Component,
	NgZone
} from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	ActionSheetController,
	LoadingController
} from 'ionic-angular'
import {
	Storage
} from '@ionic/storage'
import {
	AutopistasApiProvider
} from '../../providers/autopistas-api/autopistas-api'
import {
	TramosApiProvider
} from '../../providers/tramos-api/tramos-api'
import {
	SeccionesApiProvider
} from '../../providers/secciones-api/secciones-api'
import {
	AutopistasProvider
} from '../../providers/aplicacion/autopistas'
import {
	TramosProvider
} from '../../providers/aplicacion/tramos'
import {
	SeccionesProvider
} from '../../providers/aplicacion/secciones'


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
		private autopistasApi: AutopistasApiProvider, private zone: NgZone, private tramosApi: TramosApiProvider,
		private autopistasProvider: AutopistasProvider, public acciones: ActionSheetController, private tramosProvider: TramosProvider,
		public loading: LoadingController, private seccionesApiProvider: SeccionesApiProvider,
		private seccionesProvider: SeccionesProvider) {

		this.usuario = navParams.get('usuario')
		this.access_token = navParams.get('access_token')
	}

	ionViewDidLoad() {
		this.usuario && this.access_token ? this.obtenerAutopistasApi() : this.obtenerAutopistasOrigenDeDatos()
	}

	/* Resolver al endpoint del api para obtener el listado de autopistas. */
	obtenerAutopistasApi = () => {
		/* Crear un loager en espera para la descarga de los catalogos al endpoint del api. */
		let loader = this.loading.create({
			spinner: 'circles',
			content: 'Descargando la información, por favor espera',
		})
		/* Mostrar loager en espera. */
		loader.present();

		/* Obtener datos del usuario conectado. */
		this.storage.get('auth').then((usuario) => {
			this.autopistasApi.obtenerAutopistas(usuario).then((autopistasDelApi) => {
				/* Registrar autopistas en el origen de datos. */
				this.autopistasProvider.registrarAutopistas(usuario, autopistasDelApi).then((autopistasRegistradas) => {
					autopistasRegistradas.map((item) => {
						/* Obtener listado de tramos por autopistas al endpoint del api. */
						this.tramosApi.obtenerTramos(usuario, item.id).then((tramosDelApi) => {
							// console.log(tramosDelApi)
							/* Registrar tramos en el origen de datos. */
							this.tramosProvider.registrarTramos(item.insert_id, tramosDelApi)
							// .then((tramosInsertados) => {

							// tramos.data.data.map((item) => {
							// 	/* Descarga el catalogo de secciones al endpoint del api. */
							// 	this.seccionesApiProvider.obtenerSecciones(item.autopista_id, item.id, usuario)
							// 		.then((secciones) => {
							// 			secciones.data.data.map((item) => {
							// 				// console.log(item);

							// 			})
							// 			this.seccionesProvider.registrarSecciones(secciones)
							// 		})

							// })
							// setTimeout(() => {
							// 	this.zone.run(() => {
							// 		this.autopistas = response
							// 	})
							// 	loader.dismiss()
							// }, 6000)
							// })
						})
					})
				})
				// response.data.data.map((autopistas) => {
				// 	this.tramosApi.obtenerTramos(usuario, autopistas.id).then((response) => {
				// 		// console.log(response.data.data);
				// 		response.data.data.map((tramos) => {
				// 			this.seccionesApiProvider.obtenerSecciones(autopistas.id, tramos.id, usuario)
				// 				.then((secciones) => {
				// 					console.log(secciones)
				// 					//this.autopistasProvider.registrarAutopistas(usuario, secciones.data.data)
				// 				})

				// 		})
				// 	})
				// })

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

	/* Mostrar opciones a realizar en una autopista. */
	mostrarOpciones = (autopista) => {

		let apciones = this.acciones.create({
			title: 'Modify your album',
			buttons: [{
				text: 'Destructive',
				role: 'destructive',
				handler: () => {
					console.log('Destructive clicked');
				}
			}, {
				text: 'Archive',
				handler: () => {
					console.log('Archive clicked');
				}
			}, {
				text: 'Cancel',
				role: 'cancel',
				handler: () => {
					console.log('Cancel clicked');
				}
			}]
		});
		apciones.present();
	}
}
