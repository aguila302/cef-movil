import {
	BrowserModule
} from '@angular/platform-browser';
import {
	ErrorHandler,
	NgModule
} from '@angular/core';
import {
	IonicApp,
	IonicErrorHandler,
	IonicModule
} from 'ionic-angular';

import {
	MyApp
} from './app.component';
import {
	HomePage
} from '../pages/home/home';
import {
	ListPage
} from '../pages/list/list';

import {
	StatusBar
} from '@ionic-native/status-bar';
import {
	SplashScreen
} from '@ionic-native/splash-screen';
import {
	AuthApiProvider
} from '../providers/auth-api/auth-api'
import {
	AuthProvider
} from '../providers/aplicacion/auth';
import {
	HTTP
} from '@ionic-native/http';
import {
	DatabaseProvider
} from '../providers/database/database'
import {
	SQLite
} from '@ionic-native/sqlite'
import {
	IonicStorageModule
} from '@ionic/storage'
import {
	AutopistasApiProvider
} from '../providers/autopistas-api/autopistas-api';
import {
	AutopistasProvider
} from '../providers/aplicacion/autopistas'

import {
	TramosProvider
} from '../providers/aplicacion/tramos';
import {
	TramosApiProvider
} from '../providers/tramos-api/tramos-api';
import {
	SeccionesApiProvider
} from '../providers/secciones-api/secciones-api';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		ListPage,
		// ListadoAutopistasPage
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot()
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		ListPage,
		// ListadoAutopistasPage
	],
	providers: [
		StatusBar,
		SplashScreen, {
			provide: ErrorHandler,
			useClass: IonicErrorHandler
		},
		AuthApiProvider,
		HTTP,
		SQLite,
		DatabaseProvider,
		AuthProvider,
		AutopistasApiProvider,
		AutopistasProvider,
		TramosApiProvider,
		TramosProvider,
		SeccionesApiProvider
	]
})
export class AppModule {}
