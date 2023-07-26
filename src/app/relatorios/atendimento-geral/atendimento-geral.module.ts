import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { AtendimentoGeralRoutingModule } from './atendimento-geral.routing';
import { AtendimentoGeralComponent } from './atendimento-geral.component';


@NgModule({
  imports: [
    CommonModule,
    AtendimentoGeralRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    AtendimentoGeralComponent
  ]
})
export class AtendimentoGeralModule { }
