/**
 * Clase generada para el componente de ResumenCalificacionesPage.
 * Autor: Alfonso Hernández Montoya.
 * Fecha de creación: 23/08/2018.
 * Descripción: Clase para la funcionalidad de consultar el resumen de calificaciones de un camino.
 * Modifico: Alfonso Hernández Montoya.
 * Fecha modificación: 23/08/2018.
 */

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
	AutopistasProvider
} from '../../providers/aplicacion/autopistas'
import * as collect from 'collect.js/dist'

@IonicPage()
@Component({
	selector: 'page-resumen-calificaciones',
	templateUrl: 'resumen-calificaciones.html',
})
export class ResumenCalificacionesPage {

	autopista = {}
	calificaciones = []

	constructor(public navCtrl: NavController, public navParams: NavParams, private autopistasProvider: AutopistasProvider,
		public zone: NgZone) {
		this.autopista = this.navParams.get('autopista')
	}

	// ionViewDidLoad() {

	// }

	/* Obtener resumen de calificaciones de una autopista. */
	ionViewDidLoad() {
		this.autopistasProvider.obtenerCalificaciones(this.autopista).then(response => {
			this.zone.run(() => {
				let miColeccion = collect(response)


				let agrupados = miColeccion.groupBy('seccion')

				// console.log(agrupados.all())

				agrupados.each(function(seccion, index) {
					console.log(seccion)


				})
			})
		})
	}


	mostrarDetalleCalificacion = (calificacion) => {
		/* Mostrar el componente del detalle de calificaciones. */
		this.navCtrl.push('DetalleCalificacionPage', {
			calificacion
		}, {
			animate: true,
			animation: 'ios-transition',
			direction: 'forward'
		})
	}
}
