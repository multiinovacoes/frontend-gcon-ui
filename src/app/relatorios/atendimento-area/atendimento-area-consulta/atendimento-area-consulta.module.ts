import { AtendimentoAreaConsultaComponent } from './atendimento-area-consulta.component';
import { HeaderBreadCrumbModule } from './../../../shared/layout/header-breadcrumb/header-breadcrumb.module';
import { AtendimentoAreaConsultaRoutingModule } from './atendimento-area-consulta.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';


@NgModule({
  imports: [
    CommonModule,
    AtendimentoAreaConsultaRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    AtendimentoAreaConsultaComponent
  ]
})
export class AtendimentoAreaConsultaModule { }
