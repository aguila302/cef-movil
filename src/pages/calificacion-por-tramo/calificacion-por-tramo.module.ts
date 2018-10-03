import {
	NgModule
} from '@angular/core';
import {
	IonicPageModule
} from 'ionic-angular';
import {
	CalificacionPorTramoPage
} from './calificacion-por-tramo';
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

@NgModule({
	declarations: [
		CalificacionPorTramoPage,
	],
	imports: [
		FontAwesomeModule,
		IonicPageModule.forChild(CalificacionPorTramoPage),
	],
	exports: [
		CalificacionPorTramoPage
	]
})
export class CalificacionPorTramoPageModule {}
