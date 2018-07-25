import {
	Injectable
} from '@angular/core';

import {
	DatabaseProvider
} from '../../providers/database/database'

@Injectable()
export class AutopistasProvider {

	constructor(private databaseProvider: DatabaseProvider) {}


	/* Registrar autopistas en el origen de datos. */
	registrarAutopistas = (usuario, response) => {
		return this.databaseProvider.registrarAutopistas(usuario, response)
	}

	/* Obtener autopistas asignadas a un usuario. */
	obtenerAutopistasOrigenDeDatos = (usuario) => {
		return this.databaseProvider.obtenerAutopistasPorUsuario(usuario.usuario_id)
	}

}
