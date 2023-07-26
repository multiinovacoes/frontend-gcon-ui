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
import { ListaDetalheCallcenterComponent } from './lista-detalhe-callcenter/lista-detalhe-callcenter.component';
import { ProdutividadeCallcenterRoutingModule } from './produtividade-callcenter.routing';
import { ProdutividadeCallcenterComponent } from './produtividade-callcenter.component';


FusionChartsModule.fcRoot(FusionCharts, charts, Fusion);    
@NgModule({
  imports: [
    CommonModule,
    ProdutividadeCallcenterRoutingModule,
    AppCommonModule,
    FusionChartsModule,
    NgxPrintModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    ProdutividadeCallcenterComponent,
    ListaDetalheCallcenterComponent,
  ]
})
export class ProdutividadeCallCenterModule { }