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
	],
	exports: [
		ListadoIntensidadesPage
	]
})
export class ListadoIntensidadesPageModule {}
