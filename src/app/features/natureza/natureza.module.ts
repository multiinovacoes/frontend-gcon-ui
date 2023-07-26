import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';
import { NaturezaRoutingModule } from 'src/app/features/natureza/natureza.routing';


@NgModule({
  imports: [
    CommonModule,
    NaturezaRoutingModule,
    AppCommonModule
  ],
  declarations: [
  ]
})
export class NaturezaModule { }
