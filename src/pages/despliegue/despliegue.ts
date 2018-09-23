import {
	Component
} from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	PopoverController
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

	constructor(public navCtrl: NavController, public navParams: NavParams, private autopistasProvider: AutopistasProvider,
		public popoverCtrl: PopoverController, private catalogosApi: CatalogosApiProvider, private storage: Storage) {
		// this.autopistaId = this.navParams.get('autopista').id
		// this.nombreAutopista = this.navParams.get('autopista').descripcion
		this.autopista = this.navParams.get('autopista')

	}

	ionViewDidLoad() {
		this.obtenerCalificaciones()
	}

	/* Obtener listado de calificaciones para sincronizar. */
	obtenerCalificaciones = () => {
		this.autopistasProvider.obtenerCalificacionesXAutopista(this.autopista).then((calificaciones) => {
			this.calificaciones = calificaciones
			// console.log(this.calificaciones);

		})
	}

	/* Mostrar el popover de sincronización */
	popover = (event: any) => {
		let popover = this.popoverCtrl.create('PopoverPage', {})

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

						this.catalogosApi.sincronizarCalificaciones(this.autopista, calificacion, usuario.access_token)
							.then((response) => {
								calificacion.estatusApi = response['status']
								calificacion.data = response['data']
							})
					})
					/* Obtener las secciones del origen de datos. */
					this.autopistasProvider.obtenerSeccionesReporte(this.autopista).then((secciones) => {
						// console.log(secciones);
						secciones.forEach((seccion) => {
							/* Sincronizar la iformacion para el reporte. */
							this.catalogosApi.sincronizarSeccionesReporte(usuario.access_token,
								seccion.autopista_id, seccion.seccion_id, seccion.seccion).then(() => {

								/* Obtener conceptos de las secciones. */
								this.autopistasProvider.obtenerConceptosReporte(seccion.id).then((conceptos) => {
									conceptos.map((concepto) => {
										console.log(concepto);

										this.catalogosApi.sincronizarConceptosReporte(usuario.access_token, concepto.reporte_secciones_id, concepto.concepto_general, concepto.valor_ponderado)
											.then((response) => {
												// console.log(response);
												/* Obtener factores de las secciones. */
												this.autopistasProvider.obtenerFactoresReporte(concepto.id)
													.then((factores) => {
														console.log(factores);

														factores.map((factor) => {
															console.log(factor);
															setTimeout(() => {
																this.catalogosApi.sincronizarFactoresReporte(
																	usuario.access_token,
																	factor.reporte_conceptos_id,
																	factor.elemento_id,
																	factor.elemento,
																	factor.factor_elemento,
																	factor.valor_particular
																).then((response) => {
																	console.log(response);

																})
															}, 1000)
														})
													})
											})
									})
								})
							})
						})
					})
				})
			) : ''
		})
	}
}
