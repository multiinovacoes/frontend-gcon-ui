import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { TratarEncPesquisaComponent } from './tratar-enc-pesquisa.component';
import { TratarEncPesquisaRoutingModule } from './tratar-enc-pesquisa.routing';

@NgModule({
  imports: [
    CommonModule,
    TratarEncPesquisaRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    TratarEncPesquisaComponent
  ]
})
export class TratarEncPesquisaModule { }
