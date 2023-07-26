import { AtendimentoConclusaoComponent } from './atendimento-conclusao.component';
import { NgxPrintModule } from 'ngx-print';
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
    AtendimentoConclusaoComponent],
    exports: [
      AtendimentoConclusaoComponent
    ]

})
export class AtendimentoConclusaoModule { }
