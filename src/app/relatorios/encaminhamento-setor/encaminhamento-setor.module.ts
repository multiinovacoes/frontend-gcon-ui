import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { NgxPrintModule } from 'ngx-print';
import { EncaminhamentoSetorRoutingModule } from './encaminhamento-setor.routing';
import { EncaminhamentoSetorComponent } from './encaminhamento-setor.component';


@NgModule({
  imports: [
    CommonModule,
    EncaminhamentoSetorRoutingModule,
    AppCommonModule,
    NgxPrintModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    EncaminhamentoSetorComponent
  ]
})
export class EncaminhamentoSetorModule { }
