import { ModeloDocumentoCadastroRoutingModule } from './modelo-documento-cadastro.routing';
import { ModeloDocumentoCadastroComponent } from './modelo-documento-cadastro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  imports: [
    CommonModule,
    ModeloDocumentoCadastroRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule,
    CKEditorModule
  ],
  declarations: [
    ModeloDocumentoCadastroComponent
  ]
})
export class ModeloDocumentoCadastroModule { }
