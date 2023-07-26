import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as Fusion from "fusioncharts/themes/fusioncharts.theme.fusion";
import { NgxPrintModule } from 'ngx-print';
import { EstatisticaSatisfacaoRoutingModule } from './estatistica-satisfacao.routing';
import { EstatisticaSatisfacaoComponent } from './estatistica-satisfacao.component';

FusionChartsModule.fcRoot(FusionCharts, charts, Fusion);
@NgModule({
  imports: [
    CommonModule,
    EstatisticaSatisfacaoRoutingModule,
    AppCommonModule,
    FusionChartsModule,
    NgxPrintModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    EstatisticaSatisfacaoComponent
  ]
})
export class EstatisticaSatisfacaoModule { }
