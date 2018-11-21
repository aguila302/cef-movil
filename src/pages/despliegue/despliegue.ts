import {
	Component
} from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	PopoverController,
	ToastController
} from 'ionic-angular';
import {
	CatalogosApiProvider
} from '../../providers/catalogos-api/catalogos-api'

import {
	AutopistasProvider
} from '../../providers/aplicacion/autopistas'
import {
	Storage
} from '@ionic/storage'

@IonicPage()
@Component({
	selector: 'page-despliegue',
	templateUrl: 'despliegue.html',
})
export class DesplieguePage {
	autopistaId: number = 0
	nombreAutopista: string = ''
	autopista: Object = {}
	calificaciones = []
	calificacionesParaReporte = []

	constructor(public navCtrl: NavController, public navParams: NavParams, private autopistasProvider: AutopistasProvider,
		public popoverCtrl: PopoverController, private catalogosApi: CatalogosApiProvider, private storage: Storage, private toast: ToastController) {
		this.autopista = this.navParams.get('autopista')

	}

	ionViewDidLoad() {
		this.obtenerCalificaciones()
	}

	/* Obtener listado de calificaciones para sincronizar. */
	obtenerCalificaciones = () => {
		this.autopistasProvider.obtenerCalificacionesXAutopista(this.autopista).then((calificaciones) => {

			calificaciones.length === 0 ? (this.mensajeAdvertencia()) : (
				this.calificaciones = calificaciones
			)
		})
	}

	/* Mostrar un mensaje de advertencia de que no hay información para mostrar. */
	mensajeAdvertencia = () => {
		let toast = this.toast.create({
			message: 'No hay información para mostrar',
			duration: 3000,
			position: 'middle'
		})

		toast.present()

		this.navCtrl.pop()
	}

	/* Mostrar el popover de sincronización */
	popover = (event: any) => {
		let popover = this.popoverCtrl.create('PopoverPage', {}, {
		})

		/* Muestra el popover para sincronizar los levantamientos. */
		popover.present({
			ev: event
		})

		popover.onDidDismiss(data => {
			data !== null ? (
				this.storage.get('auth').then((usuario) => {
					this.calificaciones.map((calificacion) => {

						calificacion['estatusApi'] = ''
						calificacion['data'] = {}
						setTimeout(() => {
							this.catalogosApi.sincronizarCalificaciones(this.autopista, calificacion, usuario.access_token)
								.then((response) => {
									calificacion.estatusApi = response['status']
									calificacion.data = response['data']
								})

						}, 1000)
					})

					/* Obtener las secciones del origen de datos. */
					this.autopistasProvider.obtenerSeccionesReporte(this.autopista).then((secciones) => {
						setTimeout(() => {
							secciones.forEach((seccion) => {

								this.catalogosApi.sincronizarSeccionesReporte(usuario.access_token,
										seccion.autopista_id, seccion.seccion_id, seccion.seccion, seccion.uuid, seccion.calificacion_tramo)
									.then((response) => {
										if (response.status !== 422) {
											seccion.conceptos.map((concepto) => {
												this.catalogosApi.sincronizarConceptosReporte(usuario.access_token,
														concepto.reporte_secciones_id, concepto.id, concepto.concepto_general,
														concepto.valor_ponderado, concepto.calificacion_general)
													.then((response) => {

													})
												concepto.factores.map((factor) => {
													this.catalogosApi.sincronizarFactoresReporte(
														usuario.access_token,
														factor.reporte_conceptos_id,
														factor.elemento_id,
														factor.elemento,
														factor.factor_elemento,
														factor.valor_particular,
														factor.calificacion_particular
													).then((response) => {

													})
												})

											})
										}
									})

							})
						}, 1000)
					})
				})
			) : ''
		})
	}
}