import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { NgxPrintModule } from 'ngx-print';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { ListaDetalheCallcenterRoutingModule } from './lista-detalhe-callcenter.routing';



@NgModule({
  imports: [
    CommonModule,
    ListaDetalheCallcenterRoutingModule,
    AppCommonModule,
    NgxPrintModule,
    HeaderBreadCrumbModule
  ]
})
export class ListaDetalheCallcenterModule { }
