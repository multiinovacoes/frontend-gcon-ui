import { FeriadoCadastroComponent } from './feriado-cadastro.component';
import { FeriadoCadastroRoutingModule } from './feriado-cadastro.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    FeriadoCadastroRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    FeriadoCadastroComponent
  ]
})
export class FeriadoCadastroModule { }
