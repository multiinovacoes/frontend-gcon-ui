import { OrigemManifestacaoPesquisaComponent } from './origem-manifestacao-pesquisa.component';
import { OrigemManifestacaoPesquisaRoutingModule } from './origem-manifestacao-pesquisa.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    OrigemManifestacaoPesquisaRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    OrigemManifestacaoPesquisaComponent
  ]
})
export class OrigemManifestacaoPesquisaModule { }
