import {
	Injectable
} from '@angular/core'
import {
	HTTP
} from '@ionic-native/http'
import {
	URL_BASE,
	HEADER
} from '../constants'

@Injectable()
export class CatalogosApiProvider {

	constructor(public http: HTTP) {}

	/* Resolver al endpoint del api para obtener listado de cuerpos. */
	obtenerCuerpos = (data) => {
		let header = {
			'Authorization': `Bearer ${data.access_token}`,
			'Content-Type': HEADER
		}
		return this.http.get(`${URL_BASE}/api/cuerpos`, {}, header)
			.then((data) => {
				return {
					status: data.status,
					data: JSON.parse(data.data),
				}

			}).catch(error => {
				return {
					status: error.status,
					data: JSON.parse(error.error),
				}
			})
	}

	/* Resolver al endpoint del api para obtener listado de cuerpos. */
	obtenerElementosGeneralesCamino = (data) => {
		let header = {
			'Authorization': `Bearer ${data.access_token}`,
			'Content-Type': HEADER
		}
		return this.http.get(`${URL_BASE}/api/elementos-generales-camino`, {}, header)
			.then((data) => {
				return {
					status: data.status,
					data: JSON.parse(data.data),
				}

			}).catch(error => {
				return {
					status: error.status,
					data: JSON.parse(error.error),
				}
			})
	}

	/* Resolver al endpoint del api para obtener listado de cuerpos. */
	obtenerValoresPonderados = (data, elemento) => {
		let header = {
			'Authorization': `Bearer ${data.access_token}`,
			'Content-Type': HEADER
		}
		return this.http.get(`${URL_BASE}/api/elementos-generales/${elemento}/valores-ponderados`, {}, header)
			.then((data) => {
				return {
					status: data.status,
					data: JSON.parse(data.data),
				}

			}).catch(error => {
				return {
					status: error.status,
					data: JSON.parse(error.error),
				}
			})
	}
}
