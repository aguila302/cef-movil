import {
	Injectable
} from '@angular/core';

import {
	DatabaseProvider
} from '../../providers/database/database'

@Injectable()
export class SeccionesProvider {

	constructor(private databaseProvider: DatabaseProvider) {}

	/* Registrar secciones en el origen de datos. */
	registrarSecciones = (autopista, tramo, secciones) => {
		return this.databaseProvider.registrarSecciones(autopista, tramo, secciones)
	}
}
