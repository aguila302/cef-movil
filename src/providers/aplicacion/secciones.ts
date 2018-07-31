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
	registrarSecciones = (secciones) => {
		return this.databaseProvider.registrarSecciones(secciones.data.data)
	}
}
