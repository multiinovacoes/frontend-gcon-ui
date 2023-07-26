import { TipoRespostaRoutingModule } from './tipo-resposta.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';


@NgModule({
  imports: [
    CommonModule,
    TipoRespostaRoutingModule,
    AppCommonModule
  ],
  declarations: [
  ]
})
export class TipoRespostaModule { }
