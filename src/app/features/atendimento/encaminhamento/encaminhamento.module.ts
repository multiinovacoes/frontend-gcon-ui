import { NgxPrintModule } from 'ngx-print';
import { EncaminhamentoComponent } from './encaminhamento.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { RespostaManualComponent } from '../resposta-manual/resposta-manual.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    NgxPrintModule,
    CKEditorModule
  ],
  declarations: [
    EncaminhamentoComponent,
    RespostaManualComponent],
    exports: [
      EncaminhamentoComponent,
      RespostaManualComponent
    ]

})
export class EncaminhamentoModule { }
