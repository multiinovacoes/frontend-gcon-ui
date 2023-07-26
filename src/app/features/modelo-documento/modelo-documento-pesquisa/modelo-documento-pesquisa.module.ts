import { ModeloDocumentoPesquisaRoutingModule } from './modelo-documento-pesquisa.routing';
import { ModeloDocumentoPesquisaComponent } from './modelo-documento-pesquisa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    ModeloDocumentoPesquisaRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    ModeloDocumentoPesquisaComponent
  ]
})
export class ModeloDocumentoPesquisaModule { }
