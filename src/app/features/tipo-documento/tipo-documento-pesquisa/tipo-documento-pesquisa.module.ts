import { TipoDocumentoPesquisaComponent } from './tipo-documento-pesquisa.component';
import { TipoDocumentoPesquisaRoutingModule } from './tipo-documento-pesquisa.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    TipoDocumentoPesquisaRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    TipoDocumentoPesquisaComponent
  ]
})
export class TipoDocumentoPesquisaModule { }
