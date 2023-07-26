import { SetorRoutingModule } from './setor.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';


@NgModule({
  imports: [
    CommonModule,
    SetorRoutingModule,
    AppCommonModule
  ],
  declarations: [
  ]
})
export class SetorModule { }
