import {
	Injectable
} from '@angular/core';

import {
	DatabaseProvider
} from '../../providers/database/database'

import {
	CatalogosApiProvider
} from '../../providers/catalogos-api/catalogos-api'

@Injectable()
export class CatalogosProvider {

	cuerpos = []

	constructor(private databaseProvider: DatabaseProvider, private catalogosApi: CatalogosApiProvider) {}

	/* Descargar los catalogos del endpoint del api. */
	descargarCatalogos = (usuario) => {
		return this.catalogosApi.obtenerCuerpos(usuario).then((cuerposApi) => {
			for (let cuerpo of cuerposApi.data.data) {
				this.registrarCuerpos(cuerpo)
			}
		}).then(() => {
			this.catalogosApi.obtenerElementosGeneralesCamino(usuario).then((elementosGeneralesCaminoApi) => {
				for (let elementoGeneral of elementosGeneralesCaminoApi.data.data) {
					this.registrarElementosGenerales(elementoGeneral)
						.then((elementosGeneralesRegistrados) => {
							console.log(elementosGeneralesRegistrados)

							this.catalogosApi.obtenerValoresPonderados(usuario, elementoGeneral.id).then((valoresPonderadosApi) => {
								console.log(valoresPonderadosApi)
								for (let valorPonderado of valoresPonderadosApi.data.data) {
									this.registrarValoresPonderados(valorPonderado)
								}
							})
						})
				}

			})
		})
	}



	/* Registrar cuerpos en el origen de datos. */
	registrarCuerpos = (cuerpos) => {
		this.databaseProvider.registrarCuerpos(cuerpos)
	}

	/* Registrar elementos generales en el origen de datos. */
	registrarElementosGenerales = (elementosGenerales) => {
		return this.databaseProvider.registrarElementosGenerales(elementosGenerales)
	}

	/* Registrar valores ponderados en el origen de datos. */
	registrarValoresPonderados = (valoresPonderados) => {
		return this.databaseProvider.registrarValoresPonderados(valoresPonderados)
	}
}
