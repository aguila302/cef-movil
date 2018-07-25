import {
	Injectable
} from '@angular/core';

import {
	DatabaseProvider
} from '../../providers/database/database'

@Injectable()
export class AuthProvider {

	constructor(private databaseProvider: DatabaseProvider) {}

	/*
	Registrar token de acceso de un usuario.
	 */
	registrarToken = (data) => {
		return this.databaseProvider.registrarToken(data)
	}

	/* Actualizar datos de un usuario en el origen de datos. */
	actualizarUsuario = (data, usuario) => {
		return this.databaseProvider.actualizarUsuario(data, usuario)
	}

}
