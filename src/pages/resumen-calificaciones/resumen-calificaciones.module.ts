import {
	NgModule
} from '@angular/core';
import {
	IonicPageModule
} from 'ionic-angular';
import {
	ResumenCalificacionesPage
} from './resumen-calificaciones';

@NgModule({
	declarations: [
		ResumenCalificacionesPage,
	],
	imports: [
		IonicPageModule.forChild(ResumenCalificacionesPage),
	],
	exports: [
		ResumenCalificacionesPage
	]
})
export class ResumenCalificacionesPageModule {}
