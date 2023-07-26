import { ModeloDocumentoRoutingModule } from './modelo-documento.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';


@NgModule({
  imports: [
    CommonModule,
    ModeloDocumentoRoutingModule,
    AppCommonModule
  ],
  declarations: [
  ]
})
export class ModeloDocumentoModule { }
