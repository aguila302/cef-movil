import {
	NgModule
} from '@angular/core';
import {
	IonicPageModule
} from 'ionic-angular';
import {
	CalificacionPorTramoPage
} from './calificacion-por-tramo';

@NgModule({
	declarations: [
		CalificacionPorTramoPage,
	],
	imports: [
		IonicPageModule.forChild(CalificacionPorTramoPage),
	],
	exports: [
		CalificacionPorTramoPage
	]
})
export class CalificacionPorTramoPageModule {}
