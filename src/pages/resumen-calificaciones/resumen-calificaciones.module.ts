import {
	NgModule
} from '@angular/core';
import {
	IonicPageModule
} from 'ionic-angular';
import {
	ResumenCalificacionesPage
} from './resumen-calificaciones';
import {
	FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import {
	library
} from '@fortawesome/fontawesome-svg-core';
import {
	faCoffee
} from '@fortawesome/free-solid-svg-icons';
import {
	fas
} from '@fortawesome/free-solid-svg-icons';

library.add(fas);

@NgModule({
	declarations: [
		ResumenCalificacionesPage,
	],
	imports: [
		IonicPageModule.forChild(ResumenCalificacionesPage),
		FontAwesomeModule
	],
	exports: [
		ResumenCalificacionesPage
	]
})
export class ResumenCalificacionesPageModule {}
