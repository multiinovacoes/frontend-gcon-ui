import { TipoManifestanteRoutingModule } from './tipo-manifestante.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';


@NgModule({
  imports: [
    CommonModule,
    TipoManifestanteRoutingModule,
    AppCommonModule
  ],
  declarations: [
  ]
})
export class TipoManifestanteModule { }
