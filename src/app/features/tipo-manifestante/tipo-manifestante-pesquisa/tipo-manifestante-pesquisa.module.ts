import { TipoManifestantePesquisaRoutingModule } from './tipo-manifestante-pesquisa.routing';
import { TipoManifestantePesquisaComponent } from './tipo-manifestante-pesquisa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    TipoManifestantePesquisaRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    TipoManifestantePesquisaComponent
  ]
})
export class TipoManifestantePesquisaModule { }
