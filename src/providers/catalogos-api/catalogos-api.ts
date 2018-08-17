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

	/* Resolver al endpoint del api para obtener listado de elementos generales. */
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

	/* Resolver al endpoint del api para obtener listado de valores ponderados. */
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

	/* Resolver al endpoint del api para obtener listado de elementos por valor ponderado. */
	obtenerElementos = (data, valorPonderado) => {
		let header = {
			'Authorization': `Bearer ${data.access_token}`,
			'Content-Type': HEADER
		}
		return this.http.get(`${URL_BASE}/api/valores-ponderados/${valorPonderado}/elementos`, {}, header)
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

	/* Resolver al endpoint del api para obtener listado de factores por elemento. */
	obtenerFactorElemento = (data, elemento) => {
		let header = {
			'Authorization': `Bearer ${data.access_token}`,
			'Content-Type': HEADER
		}
		return this.http.get(`${URL_BASE}/api/elementos/${elemento}/factor`, {}, header)
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

	/* Resolver al endpoint del api para obtener defectos de elementos. */
	obtenerDefectos = (data, elemento) => {
		let header = {
			'Authorization': `Bearer ${data.access_token}`,
			'Content-Type': HEADER
		}
		return this.http.get(`${URL_BASE}/api/elementos/${elemento}/defectos`, {}, header)
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

	/* Resolver al endpoint del api para obtener las intensidades de elementos. */
	obtenerIntensidades = (data, elemento, defecto) => {
		let header = {
			'Authorization': `Bearer ${data.access_token}`,
			'Content-Type': HEADER
		}
		this.http.setRequestTimeout(15000)
		return this.http.get(`${URL_BASE}/api/elementos/${elemento}/defectos/${defecto}/intensidades`, {}, header)
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

	/* Resolver al endpoint del api para obtener los rangos de los defectos e intensidades de elementos. */
	obtenerRangos = (data, defecto) => {
		let header = {
			'Authorization': `Bearer ${data.access_token}`,
			'Content-Type': HEADER
		}
		return this.http.get(`${URL_BASE}/api/defectos/${defecto}/rangos`, {}, header)
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

	/* Resolver al endpoint del api para obtener tramos de una autopista. */
	obtenerTramos = (data, autopistaId: number) => {
		let header = {
			'Authorization': `Bearer ${data.access_token}`,
			'Content-Type': HEADER
		}
		return this.http.get(`${URL_BASE}/api/autopistas/${autopistaId}/tramos`, {}, header)
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
