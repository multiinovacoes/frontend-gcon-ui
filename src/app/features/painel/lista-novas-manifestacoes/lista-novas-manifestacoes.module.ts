import { ListaNovasManifestacoesComponent } from './lista-novas-manifestacoes.component';
import { ListaNovasManifestacoesRoutingModule } from './lista-novas-manifestacoes.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    ListaNovasManifestacoesRoutingModule,
    HeaderBreadCrumbModule,
    AppCommonModule
  ],
  declarations: [ListaNovasManifestacoesComponent]
})
export class ListaNovasManifestacoesModule { }
