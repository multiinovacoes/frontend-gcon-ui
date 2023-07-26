import { OrgaoRoutingModule } from './orgao.routing';
import { AppCommonModule } from 'src/app//app.common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrgaoRoutingModule,
    AppCommonModule

  ]
})
export class OrgaoModule { }
