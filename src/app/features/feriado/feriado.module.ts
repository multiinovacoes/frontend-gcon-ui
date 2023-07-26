import { FeriadoRoutingModule } from './feriado.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';


@NgModule({
  imports: [
    CommonModule,
    FeriadoRoutingModule,
    AppCommonModule
  ],
  declarations: [
  ]
})
export class FeriadoModule { }
