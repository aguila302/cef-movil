import {
	Injectable
} from '@angular/core';

import {
	DatabaseProvider
} from '../../providers/database/database'

@Injectable()
export class TramosProvider {

	constructor(private databaseProvider: DatabaseProvider) {}


	/* Registrar tramos en el origen de datos. */
	registrarTramos = (tramos) => {
		return this.databaseProvider.registrarTramos(tramos)
	}
}
