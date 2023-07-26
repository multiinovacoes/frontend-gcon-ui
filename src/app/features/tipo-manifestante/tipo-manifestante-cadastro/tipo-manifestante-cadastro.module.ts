import { TipoManifestanteCadastroRoutingModule } from './tipo-manifestante-cadastro.routing';
import { TipoManifestanteCadastroComponent } from './tipo-manifestante-cadastro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    TipoManifestanteCadastroRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    TipoManifestanteCadastroComponent
  ]
})
export class TipoManifestanteCadastroModule { }
