import {
	Component
} from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	ToastController,
	LoadingController
} from 'ionic-angular';
import {
	UsuarioOpciones
} from '../../interfaces/usuario-opciones'
import {
	NgForm
} from '@angular/forms'
import {
	AuthApiProvider
} from '../../providers/auth-api/auth-api'
import {
	AuthProvider
} from '../../providers/aplicacion/auth'
import {
	Storage
} from '@ionic/storage';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthApiProvider,
		public toast: ToastController, private auth: AuthProvider, private storage: Storage, public loading: LoadingController) {}

	submit = false

	ionViewDidLoad() {}

	/**
	 * Obtener propiedades de un usuario.
	 *
	 * @type {UsuarioOpciones}
	 */
	login: UsuarioOpciones = {
		usuario: '',
		clave: ''
	}

	/**
	 * Controlar el inicio de sesión de un usuario.
	 *
	 * @param {NgForm}
	 */
	onLogin(form: NgForm) {
		this.submit = true

		/**
		 * Validar usuario y obtener token de acceso.
		 *
		 * @param {[NgForm]} form.valid
		 */
		if (form.valid) {
			/* Crear un loager en espera. */
			let loader = this.loading.create({
				spinner: 'dots',
				content: 'Por favor espera',
			})
			/* Mostrar loager en espera. */
			loader.present();
			this.authProvider.obtenerTokenAcceso(form.form.controls)
				.then((response) => {
					response.status === 200 ? (this.registrarToken(response)) : (this.muestraError(response))
					/* Cerar el loager en espera. */
					setTimeout(() => {
						loader.dismiss()
					}, 5000)
				}).catch((error) => {
					console.error.bind(error)
				})
		}
	}

	/**
	 * Registrar token de acceso a la aplicación en el origen de datos.
	 *
	 * @type {[type]}
	 */
	registrarToken = (response) => {
		this.auth.registrarToken(response)
			.then((user) => {
				/* Obtener datos del usuario al endpoint. */
				this.authProvider.obtenerDatosUser(response).then((datosUser) => {
					/* Actulizar datos del usuario en el origen de datos. */
					this.auth.actualizarUsuario(datosUser, user).then((response) => {
						/* Crear storage de un usuario conectado para acceso a la aplicación. */
						this.storage.set('auth', {
							access_token: response.access_token,
							email: response.email,
							name: response.name,
							usuario_id: response.id
						}).then((storage) => {
							this.navCtrl.setRoot('ListadoAutopistasPage', {
								usuario: storage.usuario_id,
								access_token: storage.access_token
							}, {
								animate: true,
								animation: 'ios-transition',
								direction: 'forward'
							})
						})

					})
				}).catch((error) => {
					console.error.bind(error)
				})
			}).catch((error) => {
				console.error.bind(error)
			})
	}

	/**
	 * Mostrar mensaje de error de autenticasión al endpoint.
	 */
	muestraError = (response) => {
		const toast = this.toast.create({
			message: 'Las credenciales del usuario son incorrectas',
			duration: 3000,
			position: 'middle'
		});
		toast.present();
	}
}
