import { OrigemManifestacaoRoutingModule } from './origem-manifestacao.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';


@NgModule({
  imports: [
    CommonModule,
    OrigemManifestacaoRoutingModule,
    AppCommonModule
  ],
  declarations: [
  ]
})
export class OrigemManifestacaoModule { }
