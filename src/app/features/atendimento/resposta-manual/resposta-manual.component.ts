import { MessageService } from 'primeng/api';
import { LoaderService } from "src/app/core/services/loader.service";
import { EncaminhamentoService } from './../encaminhamento/encaminhamento.service';
import { EncaminhamentoResposta } from './../../../core/models/encaminhamento-resposta.model';

import { EncaminhamentoRespostaService } from './../encaminhamento/encaminhamento-resposta.service';
import { ErrorHandlerService } from './../../../core/services/error-handler.service';
import { ModeloDocumentoService } from './../../modelo-documento/modelo-documento.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Encaminhamento } from 'src/app/core/models/encaminhamento.model';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-resposta-manual',
  templateUrl: './resposta-manual.component.html',
  styleUrls: ['./resposta-manual.component.css']
})

export class RespostaManualComponent  {

  @ViewChild(NgForm) myFormRetornoManual: NgForm;
  @Output() callParent = new EventEmitter();
  encaminhamento = new Encaminhamento();
  encaminhamentoResposta = new EncaminhamentoResposta();
  displayModalRetornoManual: boolean;
  modeloDocumentos = [];

  solucaoSatisfaz = [
    { label: 'Sim', value: 1 },
    { label: 'Não', value: 0 }
  ];

  constructor(
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private encaminhamentoService: EncaminhamentoService,
    private encaminhamentoRespostaService: EncaminhamentoRespostaService,
    private modeloDocumentoService: ModeloDocumentoService
  ) { }

  resetMyFormRetornoManual(){
    if (this.myFormRetornoManual.valid){
      this.myFormRetornoManual.reset();
    }
  }

  onCloseRetornoManual(){
    this.displayModalRetornoManual = false;
  }

  showVisualizaResposta(codigoResposta: number) {
    this.loaderService.show();
    this.resetMyFormRetornoManual();
    this.carregarModeloDocumento();
    this.encaminhamentoRespostaService.consultar(codigoResposta)
    .then((dados) => {
      this.encaminhamentoResposta = dados;
    })
    .then((dados) => {
      this.loaderService.hide();
      this.displayModalRetornoManual = true;
    })
    .catch((erro) => {
      this.loaderService.hide();
      this.errorHandler.handle(erro);
    });
  }

  showRetornoManual(codigoEncaminhamento: number) {
    this.loaderService.show();
    this.encaminhamentoRespostaService.
     verificaResposta(codigoEncaminhamento).
       then(resultado => {
         if (resultado == true){
          this.loaderService.hide();
           Swal.fire({
             title: 'Encaminhamento já respondido.',
             width: 400,
             //padding: '3em',
             })
           return false;
         }else{
           this.resetMyFormRetornoManual();
           this.consultaEncaminhamento(codigoEncaminhamento);
         }
       })
       .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });

 }

  get editando() {
    return Boolean(this.encaminhamentoResposta.id)
  }


  salvar(): Promise<void>{
    this.loaderService.show();
    if (this.editando){
      return this.encaminhamentoRespostaService.
      atualizar(this.encaminhamentoResposta).
      then(res => {
        this.resetMyFormRetornoManual();
        this.onCloseRetornoManual();
        this.callParent.emit();
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          detail: "Resposta manual atualizada com sucesso!",
        });
      })
       .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
    }else{
      return this.encaminhamentoRespostaService.
      adicionar(this.encaminhamentoResposta).
      then(res => {
        this.resetMyFormRetornoManual();
        this.onCloseRetornoManual();
        this.callParent.emit();
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          detail: "Resposta manual adicionada com sucesso!",
        })
      })
       .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
    }
  }

  consultaEncaminhamento(codigoEncaminhamento: number) {
    this.encaminhamentoService.consultarEncaminhamento(codigoEncaminhamento)
      .then((dados) => {
        this.encaminhamento = dados;
      })
     .then((dados) => {
         this.loaderService.hide();
         this.carregarModeloDocumento();
         this.encaminhamentoResposta.encaminhamento = codigoEncaminhamento;
         this.displayModalRetornoManual = true;
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      })
  }

  consultaResposta(codigoResposta: number): any {
    this.encaminhamentoRespostaService.consultar(codigoResposta)
      .then((dados) => {
        this.encaminhamentoResposta = dados;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  consultaModelo(): any {
    this.encaminhamento.modeloDocumento = this.encaminhamentoResposta.modeloDocumento;
    return this.modeloDocumentoService.consultarModeloEnc(this.encaminhamento)
      .then(modelo => {
        this.encaminhamentoResposta.despacho = modelo;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarModeloDocumento(): any {
    return this.modeloDocumentoService.listarPorTipo('3')
     .then(modeloDocumentos => {
       this.modeloDocumentos = modeloDocumentos.
       map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
     })
     .catch(erro => this.errorHandler.handle(erro));
 }


}
