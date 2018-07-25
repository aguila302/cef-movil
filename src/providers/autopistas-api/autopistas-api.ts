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
export class AutopistasApiProvider {

	constructor(public http: HTTP) {}

	/* Resolver al endpoint del api para obtener listado de autopistas. */
	obtenerAutopistas = (data) => {
		let header = {
			'Authorization': `Bearer ${data.access_token}`,
			'Content-Type': HEADER
		}
		return this.http.get(`${URL_BASE}/api/autopistas`, {}, header)
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
