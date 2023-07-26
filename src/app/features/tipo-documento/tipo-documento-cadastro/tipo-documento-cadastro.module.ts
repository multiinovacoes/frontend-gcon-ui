import { TipoDocumentoCadastroComponent } from './tipo-documento-cadastro.component';
import { TipoDocumentoCadastroRoutingModule } from './tipo-documento-cadastro.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    TipoDocumentoCadastroRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    TipoDocumentoCadastroComponent
  ]
})
export class TipoDocumentoCadastroModule { }
