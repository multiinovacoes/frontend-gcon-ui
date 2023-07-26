import { ListaNovasManifestacoesRoutingModule } from './../../painel/lista-novas-manifestacoes/lista-novas-manifestacoes.routing';
import { AnexoModule } from './../anexo/anexo.module';
import { AtendimentoConclusaoModule } from './../atendimento-conclusao/atendimento-conclusao.module';
import { DespachoModule } from './../despacho/despacho.module';
import { RespostaParcialModule } from './../resposta-parcial/resposta-parcial.module';
import { EncaminhamentoModule } from './../encaminhamento/encaminhamento.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AtendimentoCadastroComponent } from './atendimento-cadastro.component';
import { AtendimentoCadastroRoutingModule } from './atendimento-cadastro.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    AtendimentoCadastroRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule,
    CKEditorModule,
    EncaminhamentoModule,
    RespostaParcialModule,
    AtendimentoConclusaoModule,
    AnexoModule,
    DespachoModule,
    ListaNovasManifestacoesRoutingModule
  ],
  declarations: [
    AtendimentoCadastroComponent  ]
})
export class AtendimentoCadastroModule { }
