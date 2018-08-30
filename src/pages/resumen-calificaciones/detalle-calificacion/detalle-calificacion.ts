import {
	Component
} from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams
} from 'ionic-angular';
import * as collect from 'collect.js/dist'

@IonicPage()
@Component({
	selector: 'page-detalle-calificacion',
	templateUrl: 'detalle-calificacion.html',
})
export class DetalleCalificacionPage {
	calificacion = {}
	calificacionTramo: number = 0

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.calificacion = navParams.get('calificacion')
	}

	ionViewDidLoad(): void {
		this.procesarCalificaciones()

	}

	procesarCalificaciones = () => {
		let coleccionCalificaciones = collect(this.calificacion['conceptos'])

		coleccionCalificaciones.map(item => {
			item.factores.map((factor) => {
				factor.valorParticularMinuendo = factor.valor_particular[0].valor_particular
				let excluido = factor.valor_particular.slice(1)
				let suma = collect(excluido).sum('valor_particular')
				factor.valorParticularSustraendo = suma
				factor.valorParticularDiferencia = factor.valorParticularMinuendo - factor.valorParticularSustraendo
				factor.calificacionParticular = factor.factor_elemento * factor.valorParticularDiferencia
			})
			let sumaCalificacionParticular = collect(item.factores).sum('calificacionParticular')

			item.calificacionGeneral = sumaCalificacionParticular
		});
		this.calificacionTramo = coleccionCalificaciones.sum('calificacionGeneral')
	}
}
