import { AppCommonModule } from './../../app.common.module';
import { AssuntoRoutingModule } from './assunto.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AssuntoRoutingModule,
    AppCommonModule

  ]
})
export class AssuntoModule { }
