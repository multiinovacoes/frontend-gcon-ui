import { AreaPesquisaComponent } from 'src/app/features/area/area-pesquisa/area-pesquisa.component';
import { AreaPesquisaRoutingModule } from './area-pesquisa.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    AreaPesquisaRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    AreaPesquisaComponent
  ]
})
export class AreaPesquisaModule { }
