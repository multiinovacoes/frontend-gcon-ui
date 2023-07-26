import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardGerencialComponent } from './dashboard-gerencial.component';



import { FusionChartsModule } from "angular-fusioncharts";

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as Fusion from "fusioncharts/themes/fusioncharts.theme.fusion";
import { DashboardGerencialRoutingModule } from './dashboard-gerencial.routing';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { AppCommonModule } from 'src/app/app.common.module';

FusionChartsModule.fcRoot(FusionCharts, charts, Fusion);
@NgModule({
  imports: [
    CommonModule,
    DashboardGerencialRoutingModule,
    FusionChartsModule,
    HeaderBreadCrumbModule,
    AppCommonModule
  ],
  declarations: [DashboardGerencialComponent]
})
export class DashboardGerencialModule { }
