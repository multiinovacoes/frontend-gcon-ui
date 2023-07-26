import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { NgxPrintModule } from 'ngx-print';
import { PainelInterativoComponent } from './painel-interativo.component';
import { PainelInterativoRoutingModule } from './painel-interativo.routing';


import { FusionChartsModule } from "angular-fusioncharts";

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as Fusion from "fusioncharts/themes/fusioncharts.theme.fusion";

FusionChartsModule.fcRoot(FusionCharts, charts, Fusion);
@NgModule({
  imports: [
    CommonModule,
    PainelInterativoRoutingModule,
    AppCommonModule,
    NgxPrintModule,
    FusionChartsModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    PainelInterativoComponent
  ]
})
export class PainelInterativoModule { }
