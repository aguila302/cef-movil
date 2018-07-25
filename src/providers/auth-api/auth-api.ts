import {
	Injectable
} from '@angular/core';
import {
	HTTP
} from '@ionic-native/http'
import {
	URL_BASE,
	TOKEN,
	CLIENT_ID,
	HEADER
} from '../constants'

@Injectable()
export class AuthApiProvider {

	constructor(private http: HTTP) {}

	/**
	 * Validar usuario y obtener token de acceso.
	 */
	obtenerTokenAcceso = (data) => {
		let params = {
			username: data.usuario.value,
			password: data.clave.value,
			grant_type: 'password',
			client_id: CLIENT_ID,
			client_secret: TOKEN,
			scope: '*'
		}
		let header = {
			'Content-Type': HEADER
		}
		/** Resuelve al endpoint del api para obtener token de acceso. */
		this.http.setRequestTimeout(15000)
		return this.http.post(`${URL_BASE}/oauth/token`, params, header)
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

	/**
	 * Resuelve al endpoint del api para obtener datos de un usuario,
	 */
	obtenerDatosUser = (response) => {
		let header = {
			'Authorization': `Bearer ${response.data.access_token}`,
			'Content-Type': HEADER
		}
		return this.http.get(`${URL_BASE}/api/usuario`, {}, header)
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
