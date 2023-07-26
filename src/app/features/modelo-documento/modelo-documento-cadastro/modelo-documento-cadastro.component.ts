import { MessageService } from 'primeng/api';
import { UtilService } from './../../../util.service';
import { ModeloDocumento } from './../../../core/models/modelo-documento.model';
import { ModeloDocumentoService } from './../modelo-documento.service';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { NgForm } from '@angular/forms';

import {EditorModule} from 'primeng/editor';


@Component({
  selector: 'app-modelo-documento-cadastro',
  templateUrl: 'modelo-documento-cadastro.component.html',
  styleUrls: ['modelo-documento-cadastro.component.css']
})
export class ModeloDocumentoCadastroComponent implements OnInit {

  modeloDocumento = new ModeloDocumento();

  tiposModelos = [];
  status = [
    { label: 'Ativo', value: 0 },
    { label: 'Inativo', value: 1 },
  ];



  constructor(
    private modeloDocumentoService: ModeloDocumentoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private routeStateService: RouteStateService,
    private utilService: UtilService) { }

  ngOnInit() {
    this.tiposModelos = this.utilService.listaTipoModelo();
    var routeState = this.routeStateService.getCurrent();
    if (routeState.data > 0) {
      this.editarModelo(routeState.data);
    }else{
      this.modeloDocumento.status = 0;
    }
  }

  back() {
    this.routeStateService.loadPrevious();
  }

  editarModelo(codigo: number) {
    return this.modeloDocumentoService.editar(codigo)
    .then((modeloDocumento) => {
      this.modeloDocumento = modeloDocumento.modeloDocumentoDto
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.modeloDocumento.id)
  }


  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarModelo(form);
    } else {
      this.adicionarModelo(form);
    }
  }

  adicionarModelo(form: NgForm) {
    this.modeloDocumentoService.adicionar(this.modeloDocumento)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Modelo adicionado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarModelo(form: NgForm) {
    this.modeloDocumentoService.atualizar(this.modeloDocumento)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Modelo atualizado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
