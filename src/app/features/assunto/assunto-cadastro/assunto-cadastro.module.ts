import { AssuntoCadastroRoutingModule } from './assunto-cadastro.routing';
import { AssuntoCadastroComponent } from './assunto-cadastro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    AssuntoCadastroRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    AssuntoCadastroComponent
  ]
})
export class AssuntoCadastroModule { }
