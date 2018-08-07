import {
	Component
} from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams
} from 'ionic-angular'
import {
	AutopistasProvider
} from '../../../providers/aplicacion/autopistas'

/**
 * Generated class for the ListadoIntensidadesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-listado-intensidades',
	templateUrl: 'listado-intensidades.html',
})
export class ListadoIntensidadesPage {
	elemento: number = 0
	defecto: number = 0
	intensidades = []

	constructor(public navCtrl: NavController, public navParams: NavParams, private autopistasProvider: AutopistasProvider) {
		this.elemento = this.navParams.get('elemento')
		this.defecto = this.navParams.get('defecto')
	}

	ionViewDidLoad() {
		this.obtenerIntensidades()
	}

	/* Obtener un listado de intensidades por elemento. */
	obtenerIntensidades = () => {
		this.autopistasProvider.obtenerIntensidades(this.elemento).then((intensidades) => {
			for (let intensidad of intensidades) {
				/* Obtener rangos por intensidad y defecto. */
				this.autopistasProvider.obtenerRangos(this.defecto, intensidad.id).then((rangos) => {
					this.intensidades.push({
						id: intensidad.id,
						descripcion: intensidad.descripcion,
						elemento_id: intensidad.elemento_id,
						intensidad_id_api: intensidad.intensidad_id_api,
						rangos: rangos
					})
				})
			}
		})
	}

	rangoSeleccionado = (event: any) => {
		console.log(event)

	}
}
