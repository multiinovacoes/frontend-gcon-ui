import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';
import { AtendimentoPeriodoComponent } from './atendimento-periodo.component';
import { AtendimentoPeriodoRoutingModule } from './atendimento-periodo.routing';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';


@NgModule({
  imports: [
    CommonModule,
    AtendimentoPeriodoRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    AtendimentoPeriodoComponent
  ]
})
export class AtendimentoPeriodoModule { }
