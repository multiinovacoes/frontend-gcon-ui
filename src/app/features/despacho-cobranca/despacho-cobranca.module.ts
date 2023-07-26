import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

import { NgxPrintModule } from 'ngx-print';
import { DespachoCobrancaComponent } from './despacho-cobranca.component';
import { DespachoCobrancaRoutingModule } from './despacho-cobranca.routing';

@NgModule({
  imports: [
    CommonModule,
    DespachoCobrancaRoutingModule,
    AppCommonModule,
    NgxPrintModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    DespachoCobrancaComponent
  ]
})
export class DespachoCobrancaModule { }
