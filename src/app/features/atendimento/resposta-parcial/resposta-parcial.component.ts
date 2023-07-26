import { UtilService } from "./../../../util.service";
import { LoaderService } from "src/app/core/services/loader.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { FormaRespostaService } from "./../../forma-resposta/forma-resposta.service";
import { NgForm } from "@angular/forms";
import { RespostaParcialService } from "./resposta-parcial.service";
import { TipoRespostaService } from "./../../tipo-resposta/tipo-resposta.service";
import { ErrorHandlerService } from "src/app/core/services/error-handler.service";
import { ModeloDocumentoService } from "./../../modelo-documento/modelo-documento.service";
import { RespostaParcial } from "./../../../core/models/resposta-parcial.model";
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";

import { NgxPrintModule } from "ngx-print";
import { AnexoService } from "../anexo/anexo.service";

@Component({
  selector: "app-resposta-parcial",
  templateUrl: "./resposta-parcial.component.html",
  styleUrls: ["./resposta-parcial.component.css"],
})
export class RespostaParcialComponent  {
  displayModal: boolean;
  respostaParcial = new RespostaParcial();
  modeloDocumentos: any;
  displayModalVisualizaResposta: boolean;
  @Output() onCallParentRespostaParcial = new EventEmitter();
  @ViewChild(NgForm) myForm: NgForm;
  habilitaEmail = true;
  tipoUsuario = false;

  formasResposta = [];

  anexos!: any;

  constructor(
    private modeloDocumentoService: ModeloDocumentoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private confirmation: ConfirmationService,
    private utilService: UtilService,
    private tipoRespostaService: TipoRespostaService,
    private respostaParcialService: RespostaParcialService,
    private anexoService: AnexoService
  ) {}



  salvar() {
    this.loaderService.show();
    return this.respostaParcialService
      .adicionar(this.respostaParcial)
      .then((res) => {
        this.onClose();
        this.onCallParentRespostaParcial.emit();
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          detail: "Resposta parcial adicionada com sucesso!",
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

  habilitaCampoEmail(codigo: any) {
    if (codigo == 2) {
      this.habilitaEmail = false;
    } else {
      this.habilitaEmail = true;
    }
  }

  consultaModelo(codigo: number): any {
    return this.modeloDocumentoService
      .consultarModeloOutros(codigo, this.respostaParcial.atendimento)
      .then((modelo) => {
        this.respostaParcial.descricao = modelo;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  showVisualizaDialog(codigoResposta: number) {
    this.consultaResposta(codigoResposta);
  }

  onCloseVisualiza() {
        this.myForm.reset();
    this.displayModalVisualizaResposta = false;
  }

  showPositionDialog(codigoAtendimento: number, email: string, tipoUsuario: number) {
    this.carregarModeloDocumento();
    this.formasResposta = this.utilService.listaFormaEnvioResposta();
    this.carregarAnexos(codigoAtendimento);
    this.habilitaEmail = true;
    this.respostaParcial = new RespostaParcial();
    if (email !== null && email !== ''){
      this.respostaParcial.formaEnvio = 2;
      this.habilitaEmail = false;
    }else{
      this.respostaParcial.formaEnvio = 0;
      this.habilitaEmail = true;
    }
    this.respostaParcial.atendimento = codigoAtendimento;
    this.respostaParcial.emailEnviado = email;
    if (tipoUsuario == 0){
      this.respostaParcial.formaEnvio = 0;
      this.tipoUsuario = true;
    }else{
      this.tipoUsuario = false;
    }
    this.displayModal = true;
  }

  carregarAnexos(codigoAtendimento: number) {
    this.anexoService.listar(codigoAtendimento).then((anexos) => {
      this.anexos = anexos;
    });
  }


  consultaResposta(codigoResposta: number) {
    this.loaderService.show();
    this.respostaParcialService
      .consultar(codigoResposta)
      .then((dados) => {
        this.respostaParcial = dados;
      })
      .then((dados) => {
        this.loaderService.hide();
        this.displayModalVisualizaResposta = true;
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      })
  }

  carregarTipoResposta() {
    this.tipoRespostaService
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

  confirmarExclusao(codigoResposta: number) {
    this.confirmation.confirm({
      message: "Tem certeza que deseja excluir esta resposta parcial?",
      accept: () => {
        this.excluir(codigoResposta);
      },
    });
  }

  excluir(codigoResposta: number) {
    this.loaderService.show();
    this.respostaParcialService
      .excluir(codigoResposta)
      .then(() => {
        this.onCallParentRespostaParcial.emit();
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          detail: "Resposta Parcial excluída com sucesso!",
        });
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }
}
