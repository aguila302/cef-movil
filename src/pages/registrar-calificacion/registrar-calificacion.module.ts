import {
	NgModule
} from '@angular/core';
import {
	IonicPageModule
} from 'ionic-angular';
import {
	RegistrarCalificacionPage
} from './registrar-calificacion';

@NgModule({
	declarations: [
		RegistrarCalificacionPage,
	],
	imports: [
		IonicPageModule.forChild(RegistrarCalificacionPage),
	],
	exports: [
		RegistrarCalificacionPage
	]
})
export class RegistrarCalificacionPageModule {}
