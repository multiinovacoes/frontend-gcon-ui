import { LoaderService } from "src/app/core/services/loader.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { EncaminhamentoService } from "./encaminhamento.service";
import { Encaminhamento } from "./../../../core/models/encaminhamento.model";
import { NgForm } from "@angular/forms";
import { ModeloDocumentoService } from "./../../modelo-documento/modelo-documento.service";
import { Setor } from "./../../../core/models/setor.model";
import { ErrorHandlerService } from "src/app/core/services/error-handler.service";
import { SetorService } from "./../../setor/setor.service";
import { AnexoService } from "./../../atendimento/anexo/anexo.service";
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { NgxPrintModule } from "ngx-print";

import { EncaminhamentoResposta } from "src/app/core/models/encaminhamento-resposta.model";
import { EncaminhamentoRespostaService } from "./encaminhamento-resposta.service";

import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-encaminhamento",
  templateUrl: "./encaminhamento.component.html",
  styleUrls: ["./encaminhamento.component.css"],
})
export class EncaminhamentoComponent implements OnInit {


  public Editor = ClassicEditor;
  
  setores: Setor[];
  displayModal: boolean;
  displayModalVisualiza: boolean;
  displayModalVisualizaResposta: boolean;
  modeloDocumentos = [];
  modelo = "";
  modeloResposta = "";
  tipoUsuario: number;
  satisfaz = "";
  loading = false;
  codigoAtendimento: number;
  anexos!: any;
  selectedAnexos: string[] = [];
  encaminhamento: any;
  codigoModeloResposta: any;
  encaminhamentoResposta: any;
  @ViewChild(NgForm) myForm: NgForm;
  @Output() callParent = new EventEmitter();
  @Output() callParentRespostaParcial = new EventEmitter();
  @ViewChild(NgForm) myFormVisualizaResposta: NgForm;

  solucaoSatisfaz = [
    { label: "Sim", value: "S" },
    { label: "Não", value: "N" },
  ];

  constructor(
    private setorService: SetorService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private loaderService: LoaderService,
    private encaminhamentoService: EncaminhamentoService,
    private modeloDocumentoService: ModeloDocumentoService,
    private encaminhamentoRespostaService: EncaminhamentoRespostaService,
    private errorHandler: ErrorHandlerService,
    private anexoService: AnexoService
  ) {}

  ngOnInit(): void {


    this.encaminhamento = new Encaminhamento();
    this.encaminhamentoResposta = new EncaminhamentoResposta();
  }



  carregarAnexos(codigoAtendimento: number) {
    this.anexoService.listar(codigoAtendimento).then((anexos) => {
      this.anexos = anexos;
    });
  }

  resetMyForm() {
    if (this.myForm.valid) {
      this.myForm.reset();
      this.modeloDocumentos = [];
      this.encaminhamento = new Encaminhamento();
      this.encaminhamentoResposta = new EncaminhamentoResposta();
    }
  }

  imprimir() {
    window.print();
  }

  resetMyFormResposta() {
    this.satisfaz = "";

    if (this.myFormVisualizaResposta.valid) {
      this.myFormVisualizaResposta.reset();
      this.modeloDocumentos = [];
      this.satisfaz = "";
      this.encaminhamento = new Encaminhamento();
      this.encaminhamentoResposta = new EncaminhamentoResposta();
    }
  }

  showPositionDialog(codigoAtendimento: number, tipoUsuario: number) {
    this.resetMyForm();
    this.tipoUsuario = tipoUsuario;
    this.carregarSetor(codigoAtendimento);
    this.carregarModeloDocumento();
    this.carregarAnexos(codigoAtendimento);
    this.encaminhamento = new Encaminhamento();
    this.encaminhamento.atendimento = codigoAtendimento;
    this.displayModal = true;
    this.modelo = "";
  }

  showVisualizaDialog(codigoEncaminhamento: number) {
    this.consultaEncaminhamento(codigoEncaminhamento);
    this.setores = Setor[0];
  }

  consultaEncaminhamento(codigoEncaminhamento: number) {
     this.loaderService.show();
    this.encaminhamentoService
      .consultarEncaminhamento(codigoEncaminhamento)
      .then((dados) => {
        this.encaminhamento = dados;
      })
    .then((dados) => {
         this.loaderService.hide();
        this.displayModalVisualiza = true;
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      })
  }

  onClose() {
    this.displayModal = false;
  }

  onCloseVisualiza() {
    this.displayModalVisualiza = false;
  }

  onCloseVisualizaResposta() {
    this.displayModalVisualizaResposta = false;
  }

  preencherEmail(setor: any) {
    return this.setorService
      .editar(setor)
      .then((setor) => {
        this.encaminhamento.emailEnviado = setor.setorDto.emailSetor;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarSetor(codigoAtendimento: number) {
    this.setorService
      .listarEspecificoSemSetorEncaminhadoAberto(codigoAtendimento)
      .then((setores) => {
        this.setores = setores.map((o: { descricao: any; id: any }) => ({
          label: o.descricao,
          value: o.id,
        }));
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarModeloDocumento() {
    return this.modeloDocumentoService
      .listarPorTipo("1")
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

  salvar() {
    if (this.tipoUsuario === 0){
      this.loaderService.show();
        this.encaminhamento.despacho = this.modelo;
        return this.encaminhamentoService
          .adicionar(this.encaminhamento)
          .then((res) => {})
          .then((res) => {
            this.resetMyForm();
            this.onClose();
            this.callParent.emit();
            this.loaderService.hide();
            this.messageService.add({
              severity: "success",
              detail: "Atendimento encaminhado com sucesso!",
            });
          })
          .catch((erro) => {
            this.loaderService.hide();
            this.errorHandler.handle(erro);
          });
    }else{
      Swal.fire({
        icon: 'info',
        title: "Deseja enviar resposta parcial?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Sim",
        denyButtonText: `Não`
      }).then((result) => {
        if (result.isConfirmed) {
          this.encaminhamento.enviarRespostaParcial = true;
        } else if (result.isDenied) {
          this.encaminhamento.enviarRespostaParcial = false;
        }else if (result.isDismissed){
          return;
        }
        this.loaderService.show();
        this.encaminhamento.despacho = this.modelo;
        return this.encaminhamentoService
          .adicionar(this.encaminhamento)
          .then((res) => {})
          .then((res) => {
            this.resetMyForm();
            this.onClose();
            this.callParent.emit();
            this.loaderService.hide();
            this.messageService.add({
              severity: "success",
              detail: "Atendimento encaminhado com sucesso!",
            });
          })
          .catch((erro) => {
            this.loaderService.hide();
            this.errorHandler.handle(erro);
          });
      });
    }
  }



  consultaModelo(): any {
    return this.modeloDocumentoService
      .consultarModeloEnc(this.encaminhamento)
      .then((modelo) => {
        this.modelo = modelo;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  confirmarExclusao(codigoEncaminhamento: number) {
    this.confirmation.confirm({
      message: "Tem certeza que deseja cancelar este encaminhamento?",
      accept: () => {
        this.excluir(codigoEncaminhamento);
      },
    });
  }

  excluir(codigoEncaminhamento: number) {
    this.loaderService.show();
    this.encaminhamentoService
      .excluir(codigoEncaminhamento)
      .then(() => {
        this.callParent.emit();
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          detail: "Encaminhamento cancelado com sucesso!",
        });
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }
}
