import { AnexoComponent } from './anexo.component';
import { NgxPrintModule } from 'ngx-print';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { AtendimentoCadastroModule } from '../atendimento-cadastro/atendimento-cadastro.module';



@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    NgxPrintModule
  ],
  declarations: [
    AnexoComponent],
    exports: [
      AnexoComponent
    ]

})
export class AnexoModule { }
