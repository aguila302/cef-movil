import {
	Injectable
} from '@angular/core';

import {
	DatabaseProvider
} from '../../providers/database/database'

import {
	AutopistasProvider
} from '../../providers/aplicacion/autopistas'
import {
	CatalogosApiProvider
} from '../../providers/catalogos-api/catalogos-api'

@Injectable()
export class CatalogosProvider {

	cuerpos = []

	constructor(private databaseProvider: DatabaseProvider, private catalogosApi: CatalogosApiProvider,
		private autopistasProvider: AutopistasProvider) {}

	/* Descargar los catalogos del endpoint del api. */
	descargarCatalogos = (usuario) => {
		return this.catalogosApi.obtenerCuerpos(usuario).then((cuerposApi) => {
			for (let cuerpo of cuerposApi.data.data) {
				this.registrarCuerpos(cuerpo)
			}
		}).then(() => {
			/* Resolver al endpoint del api para obtener elementos generales. */
			this.catalogosApi.obtenerElementosGeneralesCamino(usuario).then((elementosGeneralesCaminoApi) => {

				/* Registramos elementos generales en el origen de datos. */
				for (let elementoGeneral of elementosGeneralesCaminoApi.data.data) {
					this.registrarElementosGenerales(elementoGeneral)

					/* Resolver al endpoint del api para obtener valores ponderados. */
					this.catalogosApi.obtenerValoresPonderados(usuario, elementoGeneral.id).then((valoresPonderadosApi) => {

						/* Registramos valores ponderados en el origen de datos. */
						for (let valorPonderado of valoresPonderadosApi.data.data) {
							this.registrarValoresPonderados(valorPonderado)

							/* Resolver al endpoint del api para obtener elementos. */
							this.catalogosApi.obtenerElementos(usuario, valorPonderado.id).then((elementosApi) => {
								console.log('elementosApi')

								console.log(elementosApi)
								/* Registramos elementos en el origen de datos. */
								for (let elemento of elementosApi.data.data) {
									this.registrarElementos(elemento)

									/* Resolver al endpoint del api para obtener factores de elementos por elemento. */
									this.catalogosApi.obtenerFactorElemento(usuario, elemento.id).then((factorElementoApi) => {

										/* Registramos los factores en el origen de datos. */
										for (let factor of factorElementoApi.data.data) {
											this.registrarFactorElemento(factor)
										}
									})

									/* Resolver al endpoint del api para obtener defectos de los elementos. */
									this.catalogosApi.obtenerDefectos(usuario, elemento.id).then((defectosApi) => {
										/* Registramos los defectos en el origen de datos. */
										for (let defecto of defectosApi.data.data) {
											this.registrarDefecto(defecto)

											/* Resolver al endpoint del api para obtener rangos de los defectos e intensidades. */
											this.catalogosApi.obtenerRangos(usuario, defecto.id).then((rangosApi) => {

												/* Registramos los rangos en el origen de datos. */
												for (let rango of rangosApi.data.data) {
													this.registrarRangos(rango)
												}
											})
										}
									})

									/* Resolver al endpoint del api para obtener intensidades de los elementos. */
									this.catalogosApi.obtenerIntensidades(usuario, elemento.id).then((intensidadesApi) => {

										// Registramos las intensidades en el origen de datos.
										for (let intensidad of intensidadesApi.data.data) {
											this.registrarIntensidad(intensidad)
										}
									})
								}
							})
						}
					})
				}
			})
		}).then(() => {
			/* Resolver al endpoint del api para obtener autopistas. */
			return this.catalogosApi.obtenerAutopistas(usuario).then((autopistasApi) => {
				/* Registrar las autopistas en el origen de datos. */
				for (let autopista of autopistasApi.data.data) {
					this.registrarAutopistas(usuario, autopista)

					/* Resolver al endpoint del api para obtener tramo por autopista. */
					this.catalogosApi.obtenerTramos(usuario, autopista.id).then((tramosApi) => {
						/* Registrar los tramos en el origen de datos. */
						for (let tramo of tramosApi.data.data) {
							this.registrarTramos(tramo)

							/* Descarga el catalogo de secciones al endpoint del api. */
							this.catalogosApi.obtenerSecciones(autopista.id, tramo.id, usuario).then((seccionesApi) => {
								/* Registrar las secciones en el origen de datos. */
								for (let seccion of seccionesApi.data.data) {
									this.registrarSecciones(autopista.id, tramo.id, seccion)
								}
							})
						}
					})
				}
				return Promise.resolve(autopistasApi.data.data)
			})
		}).then((response) => {
			return response
		})
	}



	/* Registrar cuerpos en el origen de datos. */
	registrarCuerpos = (cuerpos) => {
		this.databaseProvider.registrarCuerpos(cuerpos)
	}

	/* Registrar elementos generales en el origen de datos. */
	registrarElementosGenerales = (elementosGenerales) => {
		this.databaseProvider.registrarElementosGenerales(elementosGenerales)
	}

	/* Registrar valores ponderados en el origen de datos. */
	registrarValoresPonderados = (valoresPonderados) => {
		this.databaseProvider.registrarValoresPonderados(valoresPonderados)
	}

	/* Registrar elementos en el origen de datos. */
	registrarElementos = (elemento) => {
		this.databaseProvider.registrarElementos(elemento)
	}

	/* Registrar factores elementos en el origen de datos. */
	registrarFactorElemento = (factor) => {
		this.databaseProvider.registrarFactorElemento(factor)
	}

	/* Registrar defectos de los elementos en el origen de datos. */
	registrarDefecto = (defecto) => {
		this.databaseProvider.registrarDefecto(defecto)
	}

	/* Registrar intensidad en el origen de datos. */
	registrarIntensidad = (intensidad) => {
		this.databaseProvider.registrarIntensidad(intensidad)
	}

	/* Registrar rangos en el origen de datos. */
	registrarRangos = (rango) => {
		this.databaseProvider.registrarRangos(rango)
	}

	/* Registrar autopistas en el origen de datos. */
	registrarAutopistas = (usuario, autopista) => {
		this.databaseProvider.registrarAutopistas(usuario, autopista)
	}

	/* Registrar tramos en el origen de datos. */
	registrarTramos = (tramo) => {
		this.databaseProvider.registrarTramos(tramo)
	}

	/* Registrar sección en el origen de datos. */
	registrarSecciones = (autopista, tramo, seccion) => {
		this.databaseProvider.registrarSecciones(autopista, tramo, seccion)
	}
}
