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
	ListadoIntensidadesPage
} from './listado-intensidades';

@NgModule({
	declarations: [
		ListadoIntensidadesPage,
	],
	imports: [
		IonicPageModule.forChild(ListadoIntensidadesPage),
		BrMaskerModule
	],
	exports: [
		ListadoIntensidadesPage
	]
})
export class ListadoIntensidadesPageModule {}
