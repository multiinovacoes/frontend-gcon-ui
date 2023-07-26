import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { TratarEncCadastroComponent } from './tratar-enc-cadastro.component';
import { TratarEncCadastroRoutingModule } from './tratar-enc-cadastro.routing';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  imports: [
    CommonModule,
    TratarEncCadastroRoutingModule,
    AppCommonModule,
    NgxPrintModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    TratarEncCadastroComponent
  ]
})
export class TratarEncCadastroModule { }
