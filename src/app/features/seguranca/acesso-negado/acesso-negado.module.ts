import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcessoNegadoRoutingModule } from './acesso-negado.routing';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { AcessoNegadoComponent } from './acesso-negado.component';



@NgModule({
  declarations: [
    AcessoNegadoComponent
  ],
  imports: [
    CommonModule,
    AcessoNegadoRoutingModule,
    HeaderBreadCrumbModule,
    AppCommonModule

  ]
})
export class AcessoNegadoModule { }
