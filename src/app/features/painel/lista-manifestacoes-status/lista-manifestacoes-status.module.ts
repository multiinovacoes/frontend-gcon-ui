import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { ListaManifestacoesStatusComponent } from './lista-manifestacoes-status.component';
import { ListaManifestacoesStatusRoutingModule } from './lista-manifestacoes-status.routing';

@NgModule({
  imports: [
    CommonModule,
    ListaManifestacoesStatusRoutingModule,
    HeaderBreadCrumbModule,
    AppCommonModule
  ],
  declarations: [ListaManifestacoesStatusComponent]
})
export class ListaManifestacoesStatusModule { }
