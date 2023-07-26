import { AtendimentoRoutingModule } from './atendimento.routing';
import { AppCommonModule } from '../../app.common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    AtendimentoRoutingModule,
    AppCommonModule

  ],
  declarations: []})
export class AtendimentoModule { }
