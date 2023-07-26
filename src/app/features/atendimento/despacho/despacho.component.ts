import { AnexoService } from './../anexo/anexo.service';
import { EncaminhamentoService } from "./../encaminhamento/encaminhamento.service";
import { LoaderService } from "src/app/core/services/loader.service";
import { SetorService } from "./../../setor/setor.service";
import { DespachoService } from "./despacho.service";
import { Despacho } from "./../../../core/models/despacho.model";
import { NgForm } from "@angular/forms";
import { ErrorHandlerService } from "src/app/core/services/error-handler.service";
import { ModeloDocumentoService } from "./../../modelo-documento/modelo-documento.service";
import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  OnInit,
} from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";

import { NgxPrintModule } from "ngx-print";

@Component({
  selector: "app-despacho",
  templateUrl: "./despacho.component.html",
  styleUrls: ["./despacho.component.css"],
})
export class DespachoComponent implements OnInit {
  showLoaderDialogDespacho = false;
  displayModal: boolean;
  displayModalVisualizaDespacho: boolean;
  despacho = new Despacho();
  modeloDocumentos: any;
  setoresDestino: any;
  @Output() onCallParentDespacho = new EventEmitter();
  @ViewChild(NgForm) myForm: NgForm;
  habilitaEmail = true;
  encaminhamentosAbertos!: any;
  anexos!: any;
  selectedAnexos: string[] = [];


  constructor(
    private modeloDocumentoService: ModeloDocumentoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private confirmation: ConfirmationService,
    private setorService: SetorService,
    private encaminhamentoService: EncaminhamentoService,
    private despachoService: DespachoService,
    private anexoService: AnexoService
  ) {}

  ngOnInit(): void {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoaderDialogDespacho = val;
    });
  }

  ngOnDestroy() {
    this.loaderService.status.observers.forEach(function (element) {
      element.complete();
    });
  }

   carregarAnexos(codigoAtendimento: number) {
    this.anexoService.listar(codigoAtendimento).then((anexos) => {
      this.anexos = anexos;
    });
  }

  salvar() {
    this.loaderService.show();
    return this.despachoService
      .adicionar(this.despacho)
      .then((res) => {
        this.onCallParentDespacho.emit();
        this.loaderService.hide();
        this.onClose();
        this.messageService.add({
          severity: "success",
          detail: "Despacho adicionada com sucesso!",
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

  consultaDespacho(codigoDespacho: number) {
    this.loaderService.show();
    this.despachoService
      .consultar(codigoDespacho)
      .then((dados) => {
        this.despacho = dados;
      })
      .then((dados) => {
         this.loaderService.hide();
        this.displayModalVisualizaDespacho = true;
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      })
  }

  showVisualizaDialog(codigoDespacho: number) {
    this.consultaDespacho(codigoDespacho);
  }

  onCloseVisualiza() {
    this.displayModalVisualizaDespacho = false;
  }

  habilitaCampoEmail(codigo: any) {
    this.setorService.editar(codigo).then((setor) => {
      this.despacho.emailEnviado = setor.setorDto.emailSetor;
      this.habilitaEmail = false;
    });
  }

  consultaModelo(codigo: number): any {
    return this.modeloDocumentoService
      .consultarModeloOutros(codigo, this.despacho.atendimento)
      .then((modelo) => {
        this.despacho.descricao = modelo;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  showDespacho(codigoAtendimento: number) {
    this.myForm.reset();
    this.carregarModeloDocumento();
    this.carregarSetorDestino(codigoAtendimento);
    this.carregarAnexos(codigoAtendimento);
    this.habilitaEmail = true;
    this.despacho = new Despacho();
    this.despacho.atendimento = codigoAtendimento;
    this.displayModal = true;
  }

  carregarSetorDestino(codigoAtendimento: number) {
    return this.setorService
      .listarEspecifico(codigoAtendimento)
      .then((setores) => {
        this.setoresDestino = setores.map(
          (o: { descricao: any; id: any; email: any }) => ({
            label: o.descricao,
            value: o.id,
          })
        );
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  listaEncaminhamentosAbertos(codigoAtendimento: number) {
    return this.encaminhamentoService
      .listarAbertos(codigoAtendimento)
      .then((encaminhamento) => {
        this.encaminhamentosAbertos = encaminhamento;
      });
  }

  carregarModeloDocumento() {
    return this.modeloDocumentoService
      .listarPorTipo("2")
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

  confirmarExclusao(codigoDespacho: number) {
    this.confirmation.confirm({
      message: "Tem certeza que deseja excluir este despacho?",
      accept: () => {
        this.excluir(codigoDespacho);
      },
    });
  }

  excluir(codigoDespacho: number) {
    this.loaderService.show();
    this.despachoService
      .excluir(codigoDespacho)
      .then(() => {
        this.onCallParentDespacho.emit();
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          detail: "Despacho excluído com sucesso!",
        });
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }
}
