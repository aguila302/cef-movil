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
	// disabled: boolean = true
	form: FormGroup
	intensidadSeleccionada = {}

	datosCalificacion = {
		rangoInicial: 0,
		rangoFinal: 0
	}

	/* Al cargar el componente, cargamos el listado de intensidades. */
	ionViewDidLoad(): void {
		this.obtenerIntensidades()

		// this.form = new FormGroup({
		// 	valorCalificacion: new FormControl({
		// 		disabled: true
		// 	}, Validators.compose([
		// 		Validators.required,
		// 		Validators.min(this.datosCalificacion.rangoInicial),
		// 		Validators.max(this.datosCalificacion.rangoFinal),
		// 	])),

		// })
	}

	constructor(public navCtrl: NavController, public navParams: NavParams, private autopistasProvider: AutopistasProvider,
		public view: ViewController) {
		this.elemento = this.navParams.get('elemento')
		this.defecto = this.navParams.get('defecto')
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

	/* Obtener intensidad seleccionado para la calificación. */
	activarIntensidad = (intensidad) => {
		this.intensidadSeleccionada = intensidad
	}

	/* Cerrar el cuadro modal. */
	cancelar = () => {
		this.view.dismiss()

	}

	/* Obtener intensidad a calificar. */
	aceptar = () => {
		this.view.dismiss(this.intensidadSeleccionada)
	}
}
