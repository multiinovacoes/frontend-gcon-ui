import { NgxPrintModule } from 'ngx-print';
import { DespachoComponent } from './despacho.component';
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
    DespachoComponent],
    exports: [
      DespachoComponent
    ]

})
export class DespachoModule { }
