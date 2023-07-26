
import { ConfiguracaoComponent } from './configuracao.component';
import { ConfiguracaoRoutingModule } from './configuracao.routing';
import { HeaderBreadCrumbModule } from './../../shared/layout/header-breadcrumb/header-breadcrumb.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';


@NgModule({
  imports: [
    CommonModule,
    ConfiguracaoRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    ConfiguracaoComponent
  ]
})
export class ConfiguracaoModule { }
