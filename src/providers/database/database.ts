import {
	Injectable
} from '@angular/core';
import {
	Platform
} from 'ionic-angular';
import {
	SQLite,
	SQLiteObject
} from '@ionic-native/sqlite';
import {
	BehaviorSubject
} from 'rxjs/BehaviorSubject'
import {
	SQLitePorter
} from '@ionic-native/sqlite-porter';


@Injectable()
export class DatabaseProvider {

	private database: SQLiteObject
	private dbReady = new BehaviorSubject < boolean > (false)

	/**
	 * Inicializar el origen de datos.
	 */
	constructor(private platform: Platform, private sqlite: SQLite, private sqlitePorter: SQLitePorter) {
		this.platform.ready().then(() => {
			this.sqlite.create({
				name: 'cef.db',
				location: 'default'
			}).then((db: SQLiteObject) => {
				this.database = db

				// this.sqlite.deleteDatabase({
				//     name: 'cef.db',
				//     location: 'default'
				// }).then(() => {
				//     console.log('databa se eleimanda')

				// })

				/* Diseñar las tablas del origen de datos. */
				this.crearTablas().then((res) => {
					this.dbReady.next(true)

					/* Exportamos el origen de datos a sql. */
					// this.sqlitePorter.exportDbToSql(this.database)
					// 	.then((sql) => {
					// 		console.log(sql)
					// 	})
					// 	.catch(e => {
					// 		console.error(e)
					// 	})
				})
			})

		})
	}

	/*Crear el esquema del origen de datos. */
	crearTablas = () => {
		return this.database.transaction(function(tx) {
			tx.executeSql(`CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                usuario_id INTEGER,
                name TEXT,
                email TEXT,
                access_token TEXT,
                expires_in TEXT,
                refresh_token TEXT,
                datetime DATETIME default current_timestamp);`)
			tx.executeSql(`CREATE TABLE IF NOT EXISTS autopistas (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        descripcion TEXT,
                        cadenamiento_inicial_km INTEGER,
                        cadenamiento_inicial_m INTEGER,
                        cadenamiento_final_km INTEGER,
                        cadenamiento_final_m INTEGER,
                        autopista_id_api INTEGER,
                        user_id INTEGER,
                        FOREIGN KEY(user_id) REFERENCES usuarios(id));`)

			tx.executeSql(`CREATE TABLE IF NOT EXISTS tramos (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        cadenamiento_inicial_km INTEGER,
                        cadenamiento_inicial_m INTEGER,
                        cadenamiento_final_km INTEGER,
                        cadenamiento_final_m INTEGER,
                        tramo_id_api INTEGER,
                        autopista_id INTEGER,
                        FOREIGN KEY(autopista_id) REFERENCES autopistas(id));
        `)

			tx.executeSql(`CREATE TABLE IF NOT EXISTS secciones (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        cadenamiento_inicial_km INTEGER,
                        cadenamiento_inicial_m INTEGER,
                        cadenamiento_final_km INTEGER,
                        cadenamiento_final_m INTEGER,
                        seccion_id_api INTEGER,
                        autopista_id INTEGER,
                        tramo_id INTEGER,
                        FOREIGN KEY(tramo_id) REFERENCES tramos(id),
						FOREIGN KEY(autopista_id) REFERENCES autopistas(id));`)

			tx.executeSql(`CREATE TABLE IF NOT EXISTS cuerpos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                descripcion TEXT,
                cuerpo_id_api INTEGER);`)

			tx.executeSql(`CREATE TABLE IF NOT EXISTS elementos_generales_camino (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                descripcion TEXT,
                elemento_general_id_api INTEGER);`)

			tx.executeSql(`CREATE TABLE IF NOT EXISTS valores_ponderados (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                valor_ponderado FLOAT,
                valor_ponderado_id_api INTEGER,
                elemento_general_id INTEGER,
                FOREIGN KEY(elemento_general_id) REFERENCES elementos_generales_camino(id));`)

			tx.executeSql(`CREATE TABLE IF NOT EXISTS elementos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                descripcion TEXT,
                elemento_id_api INTEGER,
                valor_ponderado_id INTEGER,
                FOREIGN KEY(valor_ponderado_id) REFERENCES valores_ponderados(id));`)

			tx.executeSql(`CREATE TABLE IF NOT EXISTS factores_elementos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                factor_elemento FLOAT,
                factor_id_api INTEGER,
                elemento_id INTEGER,
                FOREIGN KEY(elemento_id) REFERENCES elementos(id));`)

			tx.executeSql(`CREATE TABLE IF NOT EXISTS defectos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                descripcion TEXT,
                defecto_id_api INTEGER,
                elemento_id INTEGER,
                FOREIGN KEY(elemento_id) REFERENCES elementos(id));`)


			tx.executeSql(`CREATE TABLE IF NOT EXISTS intensidades (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                descripcion TEXT,
                intensidad_id_api INTEGER,
                elemento_id INTEGER,
                FOREIGN KEY(elemento_id) REFERENCES elementos(id));`)

			tx.executeSql(`CREATE TABLE IF NOT EXISTS rangos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                rango_inicial FLOAT,
                rango_final FLOAT,
                defecto_id INTEGER,
                intensidad_id INTEGER,
                rango_id_api INTEGER,
                FOREIGN KEY(defecto_id) REFERENCES defectos(id),
                FOREIGN KEY(intensidad_id) REFERENCES intensidades(id));`)
		})
	}

	/* Garantizar que el origen de datos esta lista para responder a las peticiones. */
	private isReady() {
		return new Promise((resolve, reject) => {
			if (this.dbReady.getValue()) {
				resolve();
			} else {
				this.dbReady.subscribe((ready) => {
					if (ready) {
						resolve();
					}
				});
			}
		})
	}

	/* Guardar token de acceso de un usuario para acceso a la aplicacion. */
	registrarToken = (data) => {
		let paramettros = [data.data.access_token, data.data.expires_in, data.data.refresh_token]
		return this.isReady()
			.then(() => {
				return this.database.executeSql(`insert into usuarios (access_token, expires_in, refresh_token)
                    values(?,?,?)`, paramettros)
			})

	}

	/* Actualizar infomración de un usuario. */
	actualizarUsuario = (data, usuario) => {

		let paramettros = [data.data.data.name, data.data.data.email, data.data.data.id, usuario.insertId]
		return this.isReady()
			.then(() => {
				return this.database.executeSql(`update usuarios set name = ?, email = ?, usuario_id = ? where id = ?`, paramettros)
					.then((result) => {
						/* Obtenemos toda la información de un usuario para la aplicación. */
						if (result.insertId) {
							return this.obtenerUsuario(result.insertId)
						}
					})
			})
	}

	/* Retornar usuario conectado. */
	obtenerUsuario = (userId) => {
		return this.isReady()
			.then(() => {
				return this.database.executeSql(`select * from usuarios WHERE id = ${userId}`, [])
					.then((data) => {
						if (data.rows.length) {
							return data.rows.item(0)
						}
						return null
					})
			})
	}

	/* Registrar autopistas en el origen de datos. */
	registrarAutopistas(usuario, item) {
		return this.isReady()
			.then(() => {
				let sql = `insert into autopistas (descripcion, cadenamiento_inicial_km, cadenamiento_inicial_m, cadenamiento_final_km,
                            cadenamiento_final_m, autopista_id_api, user_id) values (?,?,?,?,?,?,?);`

				return this.database.executeSql(sql, [item.descripcion, item.cadenamiento_inicial_km, item.cadenamiento_inicial_m,
					item.cadenamiento_final_km, item.cadenamiento_final_m, item.id, usuario.usuario_id
				])
			})
	}

	/* Obtener autopistas asignadas a un usuario. */
	obtenerAutopistasPorUsuario = (userId: number) => {
		return this.isReady()
			.then(() => {
				return this.database.executeSql(`select * from autopistas WHERE user_id = ${userId}`, [])
					.then((data) => {
						console.log(data)

						let autopistas = []
						for (let i = 0; i < data.rows.length; i++) {
							autopistas.push(data.rows.item(i))
						}
						return autopistas
					})
			})
	}

	/* Registrar tramos en el origen de datos. */
	registrarTramos = (tramos) => {
		let parametros = [tramos.cadenamiento_inicial_km, tramos.cadenamiento_inicial_m,
			tramos.cadenamiento_final_km, tramos.cadenamiento_final_m, tramos.id, tramos.autopista_id
		]
		return this.isReady()
			.then(() => {
				return this.database.executeSql(`insert into tramos (cadenamiento_inicial_km,
                    cadenamiento_inicial_m, cadenamiento_final_km, cadenamiento_final_m, tramo_id_api, autopista_id)
                    values(?,?,?,?,?,?)`, parametros)
			})

	}

	/* Registra las secciones en el origen de datos. */
	registrarSecciones = (autopista, tramo, secciones) => {

		let parametros = [secciones.cadenamiento_inicial_km, secciones.cadenamiento_inicial_m,
			secciones.cadenamiento_final_km, secciones.cadenamiento_final_m, secciones.id, autopista, tramo
		]

		return this.isReady()
			.then(() => {
				return this.database.executeSql(`insert into secciones (cadenamiento_inicial_km, cadenamiento_inicial_m,
		            cadenamiento_final_km, cadenamiento_final_m, seccion_id_api, autopista_id, tramo_id)
                    values(?,?,?,?,?,?,?)`, parametros)
			})
	}

	/* Registrar cuerpos en el origen de datos. */
	registrarCuerpos = (cuerpos) => {
		return this.isReady()
			.then(() => {
				let sql = `insert into cuerpos(descripcion, cuerpo_id_api) values (?,?);`
				return this.database.executeSql(sql, [cuerpos.descripcion, cuerpos.id])
			})

	}

	/* Registrar elementos generales en el origen de datos. */
	registrarElementosGenerales = (data) => {
		return this.isReady()
			.then(() => {
				let sql = `insert into elementos_generales_camino(descripcion, elemento_general_id_api) values (?,?);`
				return this.database.executeSql(sql, [data.descripcion, data.id])
			})
	}

	/* Registrar valores ponderaos de un elemento general en el origen de datos. */
	registrarValoresPonderados = (data) => {
		return this.isReady()
			.then(() => {
				let sql = `insert into valores_ponderados(valor_ponderado, valor_ponderado_id_api, elemento_general_id) values (?,?,?);`
				return this.database.executeSql(sql, [data.valor_ponderado, data.id, data.elemento_general_camino_id])
			})
	}

	/* Registrar elementos en el origen de datos. */
	registrarElementos = (elemento) => {
		return this.isReady()
			.then(() => {
				let sql = `insert into elementos(descripcion, elemento_id_api, valor_ponderado_id) values (?,?,?);`
				return this.database.executeSql(sql, [elemento.descripcion, elemento.id, elemento.valor_ponderado_id])
			})
	}

	/* Registrar factores elementos en el origen de datos. */
	registrarFactorElemento = (factor) => {
		return this.isReady()
			.then(() => {
				let sql = `insert into factores_elementos(factor_elemento, factor_id_api, elemento_id) values (?,?,?);`
				return this.database.executeSql(sql, [factor.factor_elemento, factor.id, factor.elemento_id])
			})
	}

	/* Registrar intensidad de un elemento en el origen de datos. */
	registrarIntensidad = (intensidad) => {
		return this.isReady()
			.then(() => {
				let sql = `insert into intensidades(descripcion, intensidad_id_api, elemento_id) values (?,?,?);`
				return this.database.executeSql(sql, [intensidad.descripcion, intensidad.id, intensidad.elemento_id])
			})
	}

	/* Registrar defectos de los elementos en el origen de datos. */
	registrarDefecto = (defecto) => {
		return this.isReady()
			.then(() => {
				let sql = `insert into defectos(descripcion, defecto_id_api, elemento_id) values (?,?,?);`
				return this.database.executeSql(sql, [defecto.descripcion, defecto.id, defecto.elemento_id])
			})
	}

	/* Registrar rangos de los defectos en el origen de datos. */
	registrarRangos = (rango) => {
		return this.isReady()
			.then(() => {
				let sql = `insert into rangos(rango_inicial, rango_final, defecto_id, intensidad_id, rango_id_api) values (?,?,?,?,?);`
				return this.database.executeSql(sql, [rango.rango_inicial, rango.rango_final, rango.defecto_id, rango.intensidad_id, rango.id])
			})
	}

	/* Obtener listado de elementos del origen de datos. */
	obtenerElementos = () => {
		return this.isReady()
			.then(() => {
				return this.database.executeSql(`select * from elementos order by 2 ASC`, []).then((elementos) => {
					let listaElementos = []
					for (let i = 0; i < elementos.rows.length; i++) {
						listaElementos.push(elementos.rows.item(i));
					}
					return listaElementos
				})
			})
	}

	/* Obtener listado de cuerpos del origen de datos. */
	obtenerCuerpos = () => {
		return this.isReady()
			.then(() => {
				return this.database.executeSql(`select * from cuerpos order by 2 ASC`, []).then((cuerpos) => {
					let listaCuerpos = []
					for (let i = 0; i < cuerpos.rows.length; i++) {
						listaCuerpos.push(cuerpos.rows.item(i));
					}
					return listaCuerpos
				})
			})
	}

	/* Obtener listado de secciones del origen de datos. */
	obtenerSecciones = (autopista) => {

		return this.isReady()
			.then(() => {
				return this.database.executeSql(`select * from secciones where autopista_id = ?`, [autopista.id])
					.then((secciones) => {
						let listaSecciones = []
						for (let i = 0; i < secciones.rows.length; i++) {
							listaSecciones.push(secciones.rows.item(i));
						}
						return listaSecciones
					})
			})
	}
}
