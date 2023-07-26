import { DescricaoOuvidoriaComponent } from './descricao-ouvidoria.component';
import { DescricaoOuvidoriaRoutingModule } from './descricao-ouvidoria.routing';
import { HeaderBreadCrumbModule } from './../../shared/layout/header-breadcrumb/header-breadcrumb.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  imports: [
    CommonModule,
    DescricaoOuvidoriaRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule,
    CKEditorModule
  ],
  declarations: [
    DescricaoOuvidoriaComponent
  ]
})
export class DescricaoOuvidoriaModule { }
