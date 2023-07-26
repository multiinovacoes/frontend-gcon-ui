import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { NgxPrintModule } from 'ngx-print';
import { ListaDetalheAssuntoComponent } from './lista-detalhe-assunto.component';
import { ListaDetalheAssuntoRoutingModule } from './lista-detalhe-assunto.routing';

@NgModule({
  imports: [
    CommonModule,
    ListaDetalheAssuntoRoutingModule,
    AppCommonModule,
    NgxPrintModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    ListaDetalheAssuntoComponent  ]
})
export class ListaDetalheAssuntoModule { }
