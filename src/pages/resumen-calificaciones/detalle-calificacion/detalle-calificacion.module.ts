import {
	NgModule
} from '@angular/core';
import {
	IonicPageModule
} from 'ionic-angular';
import {
	DetalleCalificacionPage
} from './detalle-calificacion';

@NgModule({
	declarations: [
		DetalleCalificacionPage,
	],
	imports: [
		IonicPageModule.forChild(DetalleCalificacionPage),
	],
	exports: [
		DetalleCalificacionPage
	]
})
export class DetalleCalificacionPageModule {}
