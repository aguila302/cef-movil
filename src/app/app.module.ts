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
	CatalogosProvider
} from '../providers/aplicacion/catalogos';

import {
	AutopistasProvider
} from '../providers/aplicacion/autopistas'
import {
	SQLitePorter
} from '@ionic-native/sqlite-porter';
import {
	CatalogosApiProvider
} from '../providers/catalogos-api/catalogos-api'

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		ListPage,
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot({
			name: '__mydb',
			driverOrder: ['indexeddb', 'sqlite', 'websql']
		}),
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		ListPage,
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
		SQLitePorter,
		CatalogosApiProvider,
		CatalogosProvider,
		AutopistasProvider
	]
})
export class AppModule {}