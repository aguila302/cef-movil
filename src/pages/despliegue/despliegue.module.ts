import {
	NgModule
} from '@angular/core';
import {
	IonicPageModule
} from 'ionic-angular';
import {
	DesplieguePage
} from './despliegue';

@NgModule({
	declarations: [
		DesplieguePage,
	],
	imports: [
		IonicPageModule.forChild(DesplieguePage),
	],
	exports: [
		DesplieguePage
	]
})
export class DesplieguePageModule {}
