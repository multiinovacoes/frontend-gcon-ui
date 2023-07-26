import { MessageService } from 'primeng/api';
import { ModeloDocumentoService } from './../modelo-documento/modelo-documento.service';
import { OrigemManifestacaoService } from './../origem-manifestacao/origem-manifestacao.service';
import { UtilService } from './../../util.service';
import { ConfiguracaoService } from './configuracao.service';
import { Configuracao } from './../../core/models/configuracao.model';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { NgForm, FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-configuracao-email',
  templateUrl: 'configuracao.component.html',
  styleUrls: ['configuracao.component.css']
})
export class ConfiguracaoComponent implements OnInit {

  configuracao = new Configuracao();
  origemManifestacoes!: any;
  prioridadesPadrao = [];
  respostasParciais!: any;


  constructor(
    private configuracaoService: ConfiguracaoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private routeStateService: RouteStateService,
    private utilService: UtilService,
    private modeloDocumentoService: ModeloDocumentoService,
    private origemManifestacaoService: OrigemManifestacaoService ) { }

  ngOnInit() {
    this.editar();
    this.prioridadesPadrao = this.utilService.listaPrioridades();
    this.carregarOrigemManifestante();
    this.carregarModeloDocumento();
  }

  back() {
    this.routeStateService.loadPrevious();
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.adicionar(form);
    }
  }


  editar() {
    return this.configuracaoService.editar()
    .then((configuracao) => {
      this.configuracao = configuracao.configuracaoDto
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.configuracao.id)
  }

  adicionar(form: NgForm) {
    this.configuracaoService.adicionar(this.configuracao)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Configuração cadastrada com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  atualizar(form: NgForm) {
    this.configuracaoService.atualizar(this.configuracao)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Configuração atualizada com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarOrigemManifestante() {
    return this.origemManifestacaoService.listar()
      .then(origemManifestacoes => {
        this.origemManifestacoes = origemManifestacoes.
        map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarModeloDocumento() {
    return this.modeloDocumentoService.listarPorTipo('3')
      .then(respostasParciais => {
        this.respostasParciais = respostasParciais.
        map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  valor(c: FormControl): boolean {
    if (c.value == 0) {
        return true;
    }
    return false;
  }



}
