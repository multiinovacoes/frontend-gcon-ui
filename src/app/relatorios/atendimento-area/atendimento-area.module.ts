import { HeaderBreadCrumbModule } from './../../shared/layout/header-breadcrumb/header-breadcrumb.module';
import { AtendimentoAreaConsultaComponent } from './atendimento-area-consulta/atendimento-area-consulta.component';
import { AtendimentoAreaRoutingModule } from './atendimento-area.routing';
import { AppCommonModule } from 'src/app/app.common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppCommonModule,
    AtendimentoAreaRoutingModule,
    HeaderBreadCrumbModule
  ]
})
export class AtendimentoAreaModule { }
