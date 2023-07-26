import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';
import { TratarEncaminhamentoRoutingModule } from './tratar-encaminhamento.routing';


@NgModule({
  imports: [
    CommonModule,
    TratarEncaminhamentoRoutingModule,
    AppCommonModule
  ],
  declarations: [
  ]
})
export class TratarEncaminhamentoModule { }
