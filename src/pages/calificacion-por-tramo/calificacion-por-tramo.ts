import {
	Component
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
import * as collect from 'collect.js/dist'

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
	listaCalificaciones = []
	promediosPonderados: number = 0
	cuerpos = []
	filtro = {
		cuerpo: '',
		seccion: '',
	}
	submit: boolean = true

	constructor(public navCtrl: NavController, public navParams: NavParams, private autopistasProvider: AutopistasProvider, private toast: ToastController) {
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
	consultarCalificacionesXTramo() {
		let toast: any

		this.autopistasProvider.consultarCalificacionesXTramo(this.filtro, this.autopistaId).then((secciones) => {
			setTimeout(() => {

				!secciones.length ? (
					toast = this.toast.create({
						message: 'No hay información para mostrar',
						duration: 3000,
						position: 'middle'
					}),
					toast.present(),
					this.listaCalificaciones = []
				) : (

					this.listaCalificaciones.splice(0, this.listaCalificaciones.length),

					secciones.forEach((seccion) => {
						let coleccionCalificaciones = collect(seccion.calificacionPonderada)


						seccion.calificacionPonderada.map((item) => {
							item['calificacionMinuendo'] = item.calificaciones[0].calificacion
							let excluido = item.calificaciones.slice(1)
							let suma = collect(excluido).sum('calificacion')
							item['calificacionSustraendo'] = suma

							item['calificacion_ponderada_elemento'] = (item.calificacionMinuendo - item.calificacionSustraendo) * item.factor_elemento
						})
						this.listaCalificaciones.push(seccion)
						seccion['calificacion_ponderada'] = coleccionCalificaciones.sum('calificacion_ponderada_elemento')
					})
				)

				let promedios = collect(this.listaCalificaciones)
				this.promediosPonderados = (promedios.sum('calificacion_ponderada'))

			}, 1000)
		})
	}
}
