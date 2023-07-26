import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { NgxPrintModule } from 'ngx-print';
import { ListaDetalheEncaminhamentoComponent } from './lista-detalhe-encaminhamento.component';
import { ListaDetalheEncaminhamentoRoutingModule } from './lista-detalhe-encaminhamento.routing';

@NgModule({
  imports: [
    CommonModule,
    ListaDetalheEncaminhamentoRoutingModule,
    AppCommonModule,
    NgxPrintModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    ListaDetalheEncaminhamentoComponent  ]
})
export class ListaDetalheEncaminhamentoModule { }
