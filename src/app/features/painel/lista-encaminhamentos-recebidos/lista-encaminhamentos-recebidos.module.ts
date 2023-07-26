import { ListaEncaminhamentosRecebidosRoutingModule } from './lista-encaminhamentos-recebidos.routing';
import { ListaEncaminhamentosRecebidosComponent } from './lista-encaminhamentos-recebidos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    ListaEncaminhamentosRecebidosRoutingModule,
    HeaderBreadCrumbModule,
    AppCommonModule
  ],
  declarations: [ListaEncaminhamentosRecebidosComponent]
})
export class ListaEncaminhamentosRecebidosModule { }
