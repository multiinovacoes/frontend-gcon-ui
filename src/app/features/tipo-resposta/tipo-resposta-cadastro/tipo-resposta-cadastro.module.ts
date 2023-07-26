import { TipoRespostaCadastroComponent } from './tipo-resposta-cadastro.component';
import { TipoRespostaCadastroRoutingModule } from './tipo-resposta-cadastro.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    TipoRespostaCadastroRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    TipoRespostaCadastroComponent
  ]
})
export class TipoRespostaCadastroModule { }
