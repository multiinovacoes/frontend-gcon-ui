import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { AlterarSenhaRoutingModule } from './alterar-senha.routing';
import { AlterarSenhaComponent } from './alterar-senha.component';

@NgModule({
  imports: [
    CommonModule,
    AlterarSenhaRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    AlterarSenhaComponent
  ]
})
export class AlterarSenhaModule { }
