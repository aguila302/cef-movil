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

import {
	CatalogosProvider
} from '../../providers/aplicacion/catalogos'



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
		private seccionesProvider: SeccionesProvider, private catalogosProvider: CatalogosProvider) {

		this.usuario = navParams.get('usuario')
		this.access_token = navParams.get('access_token')
	}

	ionViewDidLoad() {
		this.usuario && this.access_token ? this.obtenerAutopistasApi() : this.obtenerAutopistasOrigenDeDatos()
	}

	/* Resolver al endpoint del api para obtener el listado de autopistas. */
	obtenerAutopistasApi = () => {
		/* Crear un loager en saber cuando termina unespera para la descarga de los catalogos al endpoint del api. */
		let loader = this.loading.create({
			spinner: 'circles',
			content: 'Descargando la información, por favor espera',
		})
		/* Mostrar loager en espera. */
		loader.present();

		/* Obtener datos del usuario conectado. */
		this.storage.get('auth').then((usuario) => {
			/* Obtener los catalogos al endpoint del api. */
			this.catalogosProvider.descargarCatalogos(usuario).then((response) => {
				console.log('mi response')

				console.log(response)
			})
			// this.catalogosApi.obtenerCuerpos(usuario).then((cuerposApi) => {
			// 	let cuerpos = this.cuerposProvider.cuerpos = cuerposApi.data.data
			// 	this.catalogosProvider.registrarCuerpos(cuerpos).then((cuerposRegistrados) => {
			// 		console.log(cuerposRegistrados)

			// 	})
			// })
			/* Obtener autopistas de un usuario al endpoint del api. */
			// this.autopistasApi.obtenerAutopistas(usuario).then((autopistasDelApi) => {
			// 	autopistasDelApi.data.data.map((autopista) => {
			// 		/* Registrar autopistas en el origen de datos. */
			// 		this.autopistasProvider.registrarAutopistas(usuario, autopista)
			// 			.then((autopistasRegistradas) => {
			// 				/* Obtener listado de tramos por autopistas al endpoint del api. */
			// 				this.tramosApi.obtenerTramos(usuario, autopista.id).then((tramosDelApi) => {
			// 					tramosDelApi.data.data.map((tramo) => {
			// 						/* Registrar tramos en el origen de datos. */
			// 						this.tramosProvider.registrarTramos(autopistasRegistradas.insert_id, tramo)
			// 							.then((tramosRegistrados) => {
			// 								/* Descarga el catalogo de secciones al endpoint del api. */
			// 								this.seccionesApiProvider.obtenerSecciones(autopista.id, tramo.id, usuario)
			// 									.then((seccionesDelApi) => {
			// 										seccionesDelApi.data.data.map((seccion) => {
			// 											this.seccionesProvider.registrarSecciones(
			// 												autopistasRegistradas,
			// 												tramosRegistrados,
			// 												seccion
			// 											)
			// 										})
			// 										this.autopistas.push(autopistasRegistradas)

			// 									})
			// 							})
			// 					})
			// 				})
			// 			})
			// 		loader.dismiss()
			// 	})

			// }).catch((error) => {
			// 	console.error.bind(error)
			// })
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
