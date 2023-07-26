import { SetorCadastroComponent } from './setor-cadastro.component';
import { SetorCadastroRoutingModule } from './setor-cadastro.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    SetorCadastroRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    SetorCadastroComponent
  ]
})
export class SetorCadastroModule { }
