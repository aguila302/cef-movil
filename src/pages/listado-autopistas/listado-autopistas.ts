/**
 * Clase generada para el componente de ListadoAutopistasPage.
 * Autor: Alfonso Hernández Montoya.
 * Fecha de creación: 01/08/2018.
 * Descripción: Clase para la funcionalidad de inicio de sesión.
 * Modifico: Alfonso Hernández Montoya.
 * Fecha modificación: 01/08/2018.
 */

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
	CatalogosProvider
} from '../../providers/aplicacion/catalogos'
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
		private zone: NgZone, public acciones: ActionSheetController,
		public loading: LoadingController, private catalogosProvider: CatalogosProvider,
		private autopistasProvider: AutopistasProvider) {

		this.usuario = navParams.get('usuario')
		this.access_token = navParams.get('access_token')

	}

	ionViewDidLoad() {
		this.usuario && this.access_token ? this.obtenerAutopistasApi() : this.obtenerAutopistasOrigenDeDatos()
	}

	/* Resolver al endpoint del api para obtener el listado de autopistas. */
	obtenerAutopistasApi = () => {
		let usuario = {
			usuario_id: this.usuario,
			access_token: this.access_token
		}

		/* Crear un loager en saber cuando termina unespera para la descarga de los catalogos al endpoint del api. */
		let loader = this.loading.create({
			spinner: 'circles',
			content: 'Descargando la información, por favor espera',
		})
		/* Mostrar loager en espera. */
		loader.present();

		/* Obtener datos del usuario conectado. */
		/* Obtener los catalogos al endpoint del api. */
		this.catalogosProvider.descargarCatalogos(usuario).then((response) => {
			console.log('mi respuesta de la descarga');
			this.zone.run(() => {
				this.autopistas = response
			})

			setTimeout(() => {
				loader.dismiss()
			}, 4000)
		})
	}

	/* Obtener un listado de autopistas de un usuario en el origen de datros. */
	obtenerAutopistasOrigenDeDatos = () => {
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
			title: 'Selecciona una opción',
			enableBackdropDismiss: false,
			
			buttons: [{
					text: 'Registrar calificación de un camino',
					role: 'destructive',
					handler: () => {
						/* Mostrar el componente de registrar calificación. */
						this.navCtrl.push('RegistrarCalificacionPage', {
							autopista
						})
					}
				}, {
					text: 'Resumen de calificación general',
					role: 'destructive',
					handler: () => {
						/* Mostrar el componente de resumen de calificaciones. */
						this.navCtrl.push('ResumenCalificacionesPage', {
							autopista
						}, {
							animate: true,
							animation: 'ios-transition',
							direction: 'forward'
						})
					}
				}, {
					text: 'Resumen de calificación por sección',
					role: 'destructive',
					handler: () => {
						/* Mostrar el componente de resumen de calificaciones. */
						this.navCtrl.push('CalificacionPorTramoPage', {
							autopista
						}, {
							animate: true,
							animation: 'ios-transition',
							direction: 'forward'
						})
					}
				}, {
					text: 'Sincronizar información',
					role: 'destructive',
					handler: () => {
						/* Mostrar el componente de despliegue de calificaciones. */
						this.navCtrl.push('DesplieguePage', {
							autopista,
							access_token: this.access_token
						}, {
							animate: true,
							animation: 'ios-transition',
							direction: 'forward'
						})
					}
				}
				// {
				// 	text: 'Calificación por tramo',
				// 	role: 'destructive',
				// 	handler: () => {
				// 		/* Mostrar el componente de calificacion por tramo. */
				// 		this.navCtrl.push('CalificacionPorTramoPage', {
				// 			autopista
				// 		}, {
				// 			animate: true,
				// 			animation: 'ios-transition',
				// 			direction: 'forward'
				// 		})
				// 	}
				// }
			]
		});
		apciones.present();
	}
}
