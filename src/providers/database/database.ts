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
} from 'rxjs/BehaviorSubject';


@Injectable()
export class DatabaseProvider {

	private database: SQLiteObject
	private dbReady = new BehaviorSubject < boolean > (false)

	/**
	 * Inicializar el origen de datos.
	 */
	constructor(private platform: Platform, private sqlite: SQLite) {
		this.platform.ready().then(() => {
			this.sqlite.create({
				name: 'cef.db',
				location: 'default'
			}).then((db: SQLiteObject) => {
				this.database = db

				// this.sqlite.deleteDatabase({
				// 	name: 'cef.db',
				// 	location: 'default'
				// }).then(() => {
				// 	console.log('databa se eleimanda')

				// })

				/* Diseñar las tablas del origen de datos. */
				this.crearTablas().then((res) => {
					this.dbReady.next(true)
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
                        autopista_id INTEGER,
                        descripcion TEXT,
                        cadenamiento_inicial_km INTEGER,
                        cadenamiento_inicial_m INTEGER,
                        cadenamiento_final_km INTEGER,
                        cadenamiento_final_m INTEGER,
                        user_id INTEGER,
                          FOREIGN KEY(user_id) REFERENCES usuarios(id));`)
			tx.executeSql(`CREATE TABLE IF NOT EXISTS tramos (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        autopista_id_api INTEGER,
                        cadenamiento_inicial_km INTEGER,
                        cadenamiento_inicial_m INTEGER,
                        cadenamiento_final_km INTEGER,
                        cadenamiento_final_m INTEGER,
                        autopista_id_movil INTEGER,
                        FOREIGN KEY(autopista_id_movil) REFERENCES autopistas(id));`)

			tx.executeSql(`CREATE TABLE IF NOT EXISTS secciones (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        cadenamiento_inicial_km INTEGER,
                        cadenamiento_inicial_m INTEGER,
                        cadenamiento_final_km INTEGER,
                        cadenamiento_final_m INTEGER,
                        autopista_id_api INTEGER,
                        autopista_id_movil INTEGER,
                        tramo_id_api INTEGER,
                        tramo_id_movil INTEGER,
                        FOREIGN KEY(tramo_id_movil) REFERENCES tramos(id),
						FOREIGN KEY(autopista_id_movil) REFERENCES autopistas(id));
		`)
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
	registrarAutopistas(usuario, response) {
		return this.isReady()
			.then(() => {
				for (let item of response.data.data) {
					let sql = `insert into autopistas (autopista_id, descripcion, cadenamiento_inicial_km, cadenamiento_inicial_m, cadenamiento_final_km,
							cadenamiento_final_m, user_id) values (?,?,?,?,?,?,?);`

					this.database.executeSql(sql, [item.id, item.descripcion, item.cadenamiento_inicial_km, item.cadenamiento_inicial_m,
						item.cadenamiento_final_km, item.cadenamiento_final_m, usuario.usuario_id
					]).then((id) => {
						item['insert_id'] = id.insertId
					})
				}
				return Promise.resolve(response.data.data)
			})
	}

	/* Obtener autopistas asignadas a un usuario. */
	obtenerAutopistasPorUsuario = (userId: number) => {
		return this.isReady()
			.then(() => {
				return this.database.executeSql(`select * from autopistas WHERE user_id = ${userId}`, [])
					.then((data) => {
						let autopistas = []
						for (let i = 0; i < data.rows.length; i++) {
							autopistas.push(data.rows.item(i))
						}
						return autopistas
					})
			})
	}

	/* Registrar tramos en el origen de datos. */
	registrarTramos = (autopistas, tramos) => {
		console.log(autopistas)
		console.log(tramos)


		// let paramettros = [data.id, data.cadenamiento_inicial_km, data.cadenamiento_inicial_m,
		// 	data.cadenamiento_final_km, data.cadenamiento_final_m, data.insert_id
		// ]
		// return this.isReady()
		// 	.then(() => {
		// 		return this.database.executeSql(`insert into tramos (autopista_id_api, cadenamiento_inicial_km, cadenamiento_inicial_m,
		// 			cadenamiento_final_km, cadenamiento_final_m, autopista_id_movil)
		//                   values(?,?,?,?,?,?)`, paramettros).then((id) => {

		// 			data['tramo_insert_id'] = id.insertId
		// 			return data
		// 		})
		// 	})

	}

	/* Registra las secciones en el origen de datos. */
	registrarSecciones = (secciones) => {
		// console.log(secciones)

	}
}
