/**
 * Servicio generado para la gestion de la infomación de la aplicación.
 * Autor: Alfonso Hernández Montoya.
 * Fecha de creación: 01/08/2018.
 * Descripción: Servicio que administra las peticiones locales.
 * Modifico: Alfonso Hernández Montoya.
 * Fecha modificación: 01/08/2018.
 */

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

	/* Guardar calificaciones generales de los elementos. */
	guardarCalificaciones = (autopistaId, cuerpo, seccion, elementoId, defectoId, intensidadId, calificacion, uuid) => {
		return this.databaseProvider.guardarCalificaciones(autopistaId, cuerpo, seccion, elementoId, defectoId, intensidadId, calificacion, uuid)
	}

	/* Obtener resumen de calificaciones de una autopista. */
	obtenerCalificaciones = (autopista) => {
		return this.databaseProvider.obtenerCalificaciones(autopista)
	}

	/* Obtener un listado de conceptos por seccion. */
	obtenerConceptosPorSeccion = (autopistaId, seccionId) => {
		return this.databaseProvider.obtenerConceptosPorSeccion(autopistaId, seccionId)
	}

	/* Obtener conceptos particulares y factor particular por cada valor ponderado correspondiente. */
	obtenerConceptosGeneralesPorValorPonderado = (autopistaId, seccionId, valorPonderado) => {
		return this.databaseProvider.obtenerConceptosGeneralesPorValorPonderado(autopistaId, seccionId, valorPonderado)
	}

	/* Obtener calificaciones de una autopista por tramo y por sección */
	consultarCalificacionesXTramo = (filtros, autopistaId) => {
		return this.databaseProvider.consultarCalificacionesXTramo(filtros, autopistaId)
	}

	/* Obtener listado de calificaciones por autopista. */
	obtenerCalificacionesXAutopista = (autopista) => {
		return this.databaseProvider.obtenerCalificacionesXAutopista(autopista)
	}

	obtenerSeccionReporte = (seccion) => {
		return this.databaseProvider.obtenerSeccionReporte(seccion)
	}
	registrarseccionesReporte = (autopista, seccion_id, seccion, calificacionTramo, uuid) => {
		return this.databaseProvider.registrarseccionesReporte(autopista, seccion_id, seccion, calificacionTramo, uuid)
	}

	registrarConceptosReporte = (seccionId, conceptoId, conceptoGeneral, valorPonderado, calificacionGeneral) => {
		return this.databaseProvider.registrarConceptosReporte(seccionId, conceptoId, conceptoGeneral, valorPonderado, calificacionGeneral)
	}

	registrarFactoresReporte = (conceptoId, elementoId, elemento, factor_elemento, valor_particular, calificacionParticular) => {
		return this.databaseProvider.registrarFactoresReporte(conceptoId, elementoId, elemento, factor_elemento, valor_particular, calificacionParticular)
	}

	obtenerSeccionesReporte = (autopista) => {
		return this.databaseProvider.obtenerSeccionesReporte(autopista)
	}

	obtenerConceptosReporte = (seccionId) => {
		return this.databaseProvider.obtenerConceptosReporte(seccionId)
	}

	obtenerFactoresReporte = (conceptoId) => {
		return this.databaseProvider.obtenerFactoresReporte(conceptoId)
	}
}
