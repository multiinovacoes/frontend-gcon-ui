import { OrigemManifestacaoCadastroComponent } from './origem-manifestacao-cadastro.component';
import { OrigemManifestacaoCadastroRoutingModule } from './origem-manifestacao-cadastro.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    OrigemManifestacaoCadastroRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    OrigemManifestacaoCadastroComponent
  ]
})
export class OrigemManifestacaoCadastroModule { }
