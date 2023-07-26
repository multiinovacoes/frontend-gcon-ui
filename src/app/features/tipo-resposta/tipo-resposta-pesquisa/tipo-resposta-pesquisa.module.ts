import { TipoRespostaPesquisaComponent } from './tipo-resposta-pesquisa.component';
import { TipoRespostaPesquisaRoutingModule } from './tipo-resposta-pesquisa.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    TipoRespostaPesquisaRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    TipoRespostaPesquisaComponent
  ]
})
export class TipoRespostaPesquisaModule { }
