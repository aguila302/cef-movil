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
} from '../../providers/aplicacion/autopistas'

@IonicPage()
@Component({
	selector: 'page-calificacion-por-tramo',
	templateUrl: 'calificacion-por-tramo.html',
})
export class CalificacionPorTramoPage {

	autopista = {}
	autopistaId: number = 0
	nombreAutopista: string = ''
	secciones = []
	cuerpos = []
	filtro = {
		cuerpo: '',
		seccion: '',
	}
	submit: boolean = true

	constructor(public navCtrl: NavController, public navParams: NavParams, private autopistasProvider: AutopistasProvider) {
		this.autopista = this.navParams.get('autopista')
		this.autopistaId = this.navParams.get('autopista').id
		this.nombreAutopista = this.navParams.get('autopista').descripcion
	}

	ionViewDidLoad() {
		this.obtenerSeccioesPorAutopita()
		this.obtenerCuerpos()
	}

	/* Obtener un listado de secciones por autopista.*/
	obtenerSeccioesPorAutopita = () => {
		this.autopistasProvider.obtenerSecciones(this.autopistaId).then((secciones) => {
			this.secciones = secciones
		})
	}

	/* Obtener un listado de cuerpos.*/
	obtenerCuerpos = () => {
		this.autopistasProvider.obtenerCuerpos().then((cuerpos) => {
			this.cuerpos = cuerpos
		})
	}

	/* Obtener calificaciones por tramo. */
	consultarCalificacionesXTramo = () => {
		this.autopistasProvider.consultarCalificacionesXTramo(this.filtro).then((secciones) => {
			console.log(secciones)

		})
	}
}
