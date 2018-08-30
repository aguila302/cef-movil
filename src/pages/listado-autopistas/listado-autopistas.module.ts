import {
	NgModule
} from '@angular/core';
import {
	IonicPageModule
} from 'ionic-angular';
import {
	ListadoAutopistasPage
} from './listado-autopistas';
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
		ListadoAutopistasPage,
	],
	imports: [
		FontAwesomeModule,
		IonicPageModule.forChild(ListadoAutopistasPage),
	],
	exports: [
		ListadoAutopistasPage
	]
})
export class ListadoAutopistasPageModule {}
