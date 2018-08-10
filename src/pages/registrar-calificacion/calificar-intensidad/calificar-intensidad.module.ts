import {
	BrMaskerModule
} from 'brmasker-ionic-3'
import {
	NgModule
} from '@angular/core';
import {
	IonicPageModule
} from 'ionic-angular';
import {
	CalificarIntensidadPage
} from './calificar-intensidad';

@NgModule({
	declarations: [
		CalificarIntensidadPage,
	],
	imports: [
		IonicPageModule.forChild(CalificarIntensidadPage),
		BrMaskerModule
	],
	exports: [
		CalificarIntensidadPage
	]
})
export class CalificarIntensidadPageModule {}
