import { MessageService } from 'primeng/api';
import { AtendimentoConclusao } from "./../../../core/models/atendimentoConclusao.model";
import { AtendimentoService } from "./../atendimento.service";
import { Atendimento } from "./../../../core/models/atendimento.model";
import { FormaResposta } from "./../../../core/models/forma-resposta.model";
import { FormaRespostaService } from "./../../forma-resposta/forma-resposta.service";
import { EncaminhamentoService } from "./../encaminhamento/encaminhamento.service";
import { LoaderService } from "src/app/core/services/loader.service";
import { ModeloDocumentoService } from "./../../modelo-documento/modelo-documento.service";
import { ModeloDocumento } from "./../../../core/models/modelo-documento.model";
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { NgForm } from "@angular/forms";

import { ErrorHandlerService } from "src/app/core/services/error-handler.service";

import Swal from "sweetalert2/dist/sweetalert2.js";
import { AnexoService } from '../anexo/anexo.service';

@Component({
  selector: "app-atendimento-conclusao",
  templateUrl: "./atendimento-conclusao.component.html",
  styleUrls: ["./atendimento-conclusao.component.css"],
})
export class AtendimentoConclusaoComponent  {
  atendimentoConclusao = new AtendimentoConclusao();
  habilitaEmail = true;
  formasResposta = [];
  displayModal: boolean;
  desabilitaFormaResposta: boolean;
  textoExecutor: any;
  textoProvidencia: any;
  modeloDocumentos = [];
  showLoaderDialogConclusao = false;
  @ViewChild(NgForm) myForm: NgForm;
  @Output() onCallParentConclusao = new EventEmitter();
  anexos!: any;

  constructor(
    private errorHandler: ErrorHandlerService,
    private atendimentoService: AtendimentoService,
    private modeloDocumentoService: ModeloDocumentoService,
    private loaderService: LoaderService,
    private messageService: MessageService,
    private encaminhamentoService: EncaminhamentoService,
    private formaRespostaService: FormaRespostaService,
    private anexoService: AnexoService
  ) {}


  consultaAtendimento(codigo: number) {
    this.atendimentoService
      .editar(codigo)
      .then((atendimento) => {
        this.atendimentoConclusao.atendimento = atendimento.id;
        this.atendimentoConclusao.email = atendimento.email;
        if (atendimento.tipoUsuario == 0) {
          this.atendimentoConclusao.formaResposta = 5;
          this.desabilitaFormaResposta = true;
        } else {
          if (atendimento.email.length > 5) {
            this.atendimentoConclusao.formaResposta = 1;
            this.habilitaEmail = false;
          }
        }
      })
      .catch(erro => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      })
  }

  showConclusao(codigoAtendimento: number, listaEncaminhamentos: boolean) {
    this.loaderService.show();
    this.resetMyForm();
    this.consultaAtendimento(codigoAtendimento);
    if (listaEncaminhamentos == true){
      this.consultaResposta(codigoAtendimento);
    }else{
      this.carregarModeloDocumento();
      this.carregarFormaResposta();
      this.habilitaEmail = true;
      this.carregarAnexos(codigoAtendimento);
      this.desabilitaFormaResposta = false;
      this.loaderService.hide();
      this.displayModal = true;
    }
  }

  carregarAnexos(codigoAtendimento: number) {
    this.anexoService.listar(codigoAtendimento).then((anexos) => {
      this.anexos = anexos;
    });
  }

  consultaResposta(codigoAtendimento: number): any {
    return this.encaminhamentoService
      .encaminhamentoSatisfaz(codigoAtendimento)
      .then((resposta) => {
        this.textoExecutor = resposta;
        if (this.textoExecutor == null){
          Swal.fire("Conclusão", "Para Concluir um atendimento o usuário precisa escolher uma solução que satisfaça", "warning");
          this.loaderService.hide();
          return;
        }
      })
      .then((resposta) => {
         if (this.textoExecutor != null){
            this.carregarModeloDocumento();
            this.carregarFormaResposta();
            this.carregarAnexos(codigoAtendimento);
            this.habilitaEmail = true;
            this.desabilitaFormaResposta = false;
            this.loaderService.hide();
            this.displayModal = true;
         }
      })
      .catch(erro => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      })
  }

  habilitaCampoEmail(codigo: any) {
    if (codigo == 1) {
      this.habilitaEmail = false;
    } else {
      this.habilitaEmail = true;
    }
  }

  resetMyForm() {
    if (this.myForm.valid) {
      this.myForm.reset();
    }
  }

  salvar() {
    this.loaderService.show();
    return this.atendimentoService
      .concluir(this.atendimentoConclusao)
      .then((res) => {})
      .then((res) => {
        this.resetMyForm();
        this.onClose();
        this.onCallParentConclusao.emit();
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          detail: "Atendimento concluído com sucesso!",
        });
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }

  onClose() {
    this.displayModal = false;
  }

  carregarModeloDocumento() {
    return this.modeloDocumentoService
      .listarPorTipo("3")
      .then((modeloDocumentos) => {
        this.modeloDocumentos = modeloDocumentos.map(
          (o: { descricao: any; id: any }) => ({
            label: o.descricao,
            value: o.id,
          })
        );
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  consultaModelo(codigo: number): any {
    return this.modeloDocumentoService
      .consultarModeloOutros(codigo, this.atendimentoConclusao.atendimento)
      .then((modelo) => {
        this.atendimentoConclusao.textoProvidencia = modelo;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarFormaResposta() {
    this.formaRespostaService
      .listar()
      .then((formasResposta) => {
        this.formasResposta = formasResposta.map(
          (o: { descricao: any; id: any }) => ({
            label: o.descricao,
            value: o.id,
          })
        );
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }
}
