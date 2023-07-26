import { TipoDocumentoRoutingModule } from './tipo-documento.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';


@NgModule({
  imports: [
    CommonModule,
    TipoDocumentoRoutingModule,
    AppCommonModule
  ],
  declarations: [
  ]
})
export class TipoDocumentoModule { }
