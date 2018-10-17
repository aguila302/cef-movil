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
	NavParams,
	ToastController
} from 'ionic-angular'
import {
	AutopistasProvider
} from '../../providers/aplicacion/autopistas'
import {
	faCoffee
} from '@fortawesome/free-solid-svg-icons';

@IonicPage()
@Component({
	selector: 'page-resumen-calificaciones',
	templateUrl: 'resumen-calificaciones.html',
})
export class ResumenCalificacionesPage {

	title = 'app';
	faCoffee = faCoffee;



	autopista = {}
	calificaciones = []
	width: number = 5

	constructor(public navCtrl: NavController, public navParams: NavParams, private autopistasProvider: AutopistasProvider,
		public zone: NgZone, private toast: ToastController) {
		this.autopista = this.navParams.get('autopista')
	}

	/* Obtener resumen de calificaciones de una autopista. */
	ionViewDidLoad() {
		this.autopistasProvider.obtenerCalificaciones(this.autopista).then(response => {
			response.length === 0 ? (this.mensajeAdvertencia()) : (
				this.zone.run(() => {
					for (let index of response) {
						/* Obtener conceptos por cada sección. */
						this.autopistasProvider.obtenerConceptosPorSeccion(this.autopista, index.id).then((conceptos) => {
							this.calificaciones.push({
								id: index.id,
								seccion: index.seccion,
								conceptos: conceptos
							})
						})
					}
				})
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