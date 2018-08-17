import {
	Injectable
} from '@angular/core';

import {
	DatabaseProvider
} from '../../providers/database/database'

@Injectable()
export class AutopistasProvider {

	constructor(private databaseProvider: DatabaseProvider) {}

	/* Obtener autopistas asignadas a un usuario. */
	obtenerAutopistasOrigenDeDatos = (usuario) => {
		return this.databaseProvider.obtenerAutopistasPorUsuario(usuario.usuario_id)
	}

	/* Obtener listado de elementos del origen de datos. */
	obtenerElementos = () => {
		return this.databaseProvider.obtenerElementos()
	}

	/* Obtener listado de cuerpos del origen de datos. */
	obtenerCuerpos = () => {
		return this.databaseProvider.obtenerCuerpos()
	}

	/* Obtener listado de secciones del origen de datos. */
	obtenerSecciones = (autopista) => {
		return this.databaseProvider.obtenerSecciones(autopista)
	}

	/* Obtener defectos por elementos en el origen de datos. */
	obtenerefectos = (elemento) => {
		return this.databaseProvider.obtenerDefectosPorElemento(elemento)
	}

	/* Obtener un listado de intensidades por elemento en el origen de datos. */
	obtenerIntensidades = (elemento: number, defecto: number) => {
		return this.databaseProvider.obtenerIntensidades(elemento, defecto)
	}

	/* Obtener un listado de rangis por defecto y por intensidad en el origen de datos. */
	obtenerRangos = (elemento, defecto, intensidad) => {
		return this.databaseProvider.obtenerRangos(elemento, defecto, intensidad)
	}
}
