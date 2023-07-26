import { AppCommonModule } from './../../app.common.module';
import { AreaRoutingModule } from './area.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AreaRoutingModule,
    AppCommonModule

  ]
})
export class AreaModule { }
