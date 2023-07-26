import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { AtendimentoUsuarioRoutingModule } from './atendimento-usuario.routing';
import { AtendimentoUsuarioComponent } from './atendimento-usuario.component';


@NgModule({
  imports: [
    CommonModule,
    AtendimentoUsuarioRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    AtendimentoUsuarioComponent
  ]
})
export class AtendimentoUsuarioModule { }
