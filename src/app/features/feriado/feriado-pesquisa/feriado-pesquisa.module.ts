import { FeriadoPesquisaComponent } from './feriado-pesquisa.component';
import { FeriadoPesquisaRoutingModule } from './feriado-pesquisa.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    FeriadoPesquisaRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    FeriadoPesquisaComponent
  ]
})
export class FeriadoPesquisaModule { }
