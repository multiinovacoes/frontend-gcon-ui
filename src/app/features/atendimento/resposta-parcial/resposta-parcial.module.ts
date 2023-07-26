import { NgxPrintModule } from 'ngx-print';
import { RespostaParcialComponent } from './resposta-parcial.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';


@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    NgxPrintModule
  ],
  declarations: [
    RespostaParcialComponent],
    exports: [
      RespostaParcialComponent
    ]

})
export class RespostaParcialModule { }
