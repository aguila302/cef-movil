import {
	Injectable
} from '@angular/core';

import {
	HTTP
} from '@ionic-native/http'
import {
	URL_BASE,
	HEADER
} from '../constants'

@Injectable()
export class SeccionesApiProvider {

	constructor(private http: HTTP) {}

	/* Resolver al endpoint del api para obtener listado de secciones. */
	obtenerSecciones = (autopista, tramo, usuario) => {
		let header = {
			'Authorization': `Bearer ${usuario.access_token}`,
			'Content-Type': HEADER
		}
		return this.http.get(`${URL_BASE}/api/autopistas/${autopista}/tramos/${tramo}/secciones`, {}, header)
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
