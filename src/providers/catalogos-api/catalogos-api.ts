/**
 * Servicio generado para la gestion API.
 * Autor: Alfonso Hernández Montoya.
 * Fecha de creación: 01/08/2018.
 * Descripción: Servicio que administra las peticiones hacia el API.
 * Modifico: Alfonso Hernández Montoya.
 * Fecha modificación: 01/08/2018.
 */

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
	responseResult = {}

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

	/* Obtenemos los datos de las calificaciones a ser sincronizados. */
	async sincronizarCalificaciones(autopista, calificaciones, accessToken) {
		let data = {
			autopista_id: autopista.id,
			cuerpo_id: calificaciones.cuerpo_id,
			seccion_id: calificaciones.seccion_id,
			elemento_id: calificaciones.elemento_id,
			defecto_id: calificaciones.defecto_id,
			intensidad_id: calificaciones.intensidad_id,
			calificacion: calificaciones.calificacion,
			uuid: calificaciones.uuid,
		}

		await this.resolveApi(data, accessToken).then((response) => {
			this.responseResult = response
		}).catch(error => {
			console.error.bind(console)
		})
		return this.responseResult
	}

	/**
	 * Realiza un resolve al end point y sincroniza la informacion de los levantamientos.
	 */
	async resolveApi(data, accessToken) {
		let headers = {
			'Authorization': `Bearer ${accessToken}`,
			'Accept': 'application/json',
			'Content-Type': 'multipart/form-data'
		}

		return this.http.post(`${URL_BASE}/api/calificaciones`, data, headers)
			.then(data => {
				return {
					'status': data.status,
					'data': JSON.parse(data.data),
					'headers': data.headers
				}
			}).catch(error => {
				return {
					'status': error.status,
					'data': JSON.parse(error.error),
					'headers': error.headers,
				}
			})

	}

	/* Sincronizar las secciones para el reporte al end point del api.
	 */
	sincronizarSeccionesReporte(accessToken, autopistaId, seccionId, seccion, uuid, calificacionTramo) {
		let data = {
			autopista_id: autopistaId,
			seccion_id: seccionId,
			seccion: seccion,
			uuid: uuid,
			calificacion_tramo: calificacionTramo
		}
		let headers = {
			'Authorization': `Bearer ${accessToken}`,
			'Accept': 'application/json',
		}

		return this.http.post(`${URL_BASE}/api/reporte-secciones`, data, headers)
			.then(data => {
				return {
					'status': data.status,
					'data': JSON.parse(data.data),
					'headers': data.headers
				}
			}).catch(error => {
				return {
					'status': error.status,
					'data': JSON.parse(error.error),
					'headers': error.headers,
				}
			})

	}

	sincronizarConceptosReporte(accessToken, reporteSeccionesId, conceptoId, conceptoGeneral, valorPonderado, calificacionGeneral) {
		let data = {
			reporte_secciones_id: reporteSeccionesId,
			concepto_general: conceptoGeneral,
			valor_ponderado: valorPonderado,
			calificacion_general: calificacionGeneral,
			concepto_id: conceptoId
		}
		let headers = {
			'Authorization': `Bearer ${accessToken}`,
			'Accept': 'application/json',
			'Content-Type': 'multipart/form-data'
		}

		return this.http.post(`${URL_BASE}/api/reporte-conceptos`, data, headers)
			.then(data => {
				return {
					'status': data.status,
					'data': JSON.parse(data.data),
					'headers': data.headers
				}
			}).catch(error => {
				return {
					'status': error.status,
					'data': JSON.parse(error.error),
					'headers': error.headers,
				}
			})
	}

	sincronizarFactoresReporte(accessToken, reporteConceptosId, elementoId, elemento, factorElemento, valorParticular, calificacionParticular) {
		let data = {
			reporte_conceptos_id: reporteConceptosId,
			elemento_id: elementoId,
			elemento: elemento,
			factor_elemento: factorElemento,
			valor_particular: valorParticular,
			calificacion_particular: calificacionParticular
		}
		let headers = {
			'Authorization': `Bearer ${accessToken}`,
			'Accept': 'application/json',
			'Content-Type': 'multipart/form-data'
		}

		return this.http.post(`${URL_BASE}/api/reporte-factores`, data, headers)
			.then(data => {
				return {
					'status': data.status,
					'data': JSON.parse(data.data),
					'headers': data.headers
				}
			}).catch(error => {
				return {
					'status': error.status,
					'data': JSON.parse(error.error),
					'headers': error.headers,
				}
			})
	}
}
