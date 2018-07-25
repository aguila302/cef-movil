import {
	NgModule
} from '@angular/core';
import {
	IonicPageModule
} from 'ionic-angular';
import {
	ListadoAutopistasPage
} from './listado-autopistas';

@NgModule({
	declarations: [
		ListadoAutopistasPage,
	],
	imports: [
		IonicPageModule.forChild(ListadoAutopistasPage),
	],
	exports: [
		ListadoAutopistasPage
	]
})
export class ListadoAutopistasPageModule {}
