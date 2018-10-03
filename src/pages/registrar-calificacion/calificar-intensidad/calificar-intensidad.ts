/**
 * Clase generada para el componente de CalificarIntensidadPage.
 * Autor: Alfonso Hernández Montoya.
 * Fecha de creación: 01/08/2018.
 * Descripción: Clase para la funcionalidad de calificar una intensidad.
 * Modifico: Alfonso Hernández Montoya.
 * Fecha modificación: 01/08/2018.
 */

import {
	FormGroup,
	FormControl,
	Validators
} from '@angular/forms'

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
 * Generated class for the CalificarIntensidadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-calificar-intensidad',
	templateUrl: 'calificar-intensidad.html',
})
export class CalificarIntensidadPage {

	intensidad = {}
	calificacionInicial = 0
	calificacionFinal = 0
	nombreIntensidad: string = ''
	form: FormGroup
	calificaionCero: number

	constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
		this.intensidad = this.navParams.get('intensidad')

		this.nombreIntensidad = this.navParams.get('intensidad').descripcion
		this.calificacionInicial = this.navParams.get('intensidad').rangos[0].rango_inicial
		this.calificacionFinal = this.navParams.get('intensidad').rangos[0].rango_final

		this.calificacionInicial === 0 && this.calificacionFinal === 0 ? this.calificaionCero = 0 : ''

	}

	/* inicial el componenete form reactive. */
	ngOnInit(): void {
		this.form = new FormGroup({
			calificacion: new FormControl('', Validators.compose([
				Validators.required,
				Validators.min(this.calificacionInicial),
				Validators.max(this.calificacionFinal),
			]))
		})
	}

	/* Obtener el control calificacion de formualario reactive. */
	get calificacion() {
		return this.form.get('calificacion')
	}

	/* Obtener calificacion y cerrar el modal de calificación. */
	calificar = () => {
		this.view.dismiss({
			calificacion: this.calificacion.value,
			intensidad: this.intensidad
		})
	}

	/* Cerrar el cuadro modal. */
	cancelar = () => {
		this.view.dismiss()
	}
}