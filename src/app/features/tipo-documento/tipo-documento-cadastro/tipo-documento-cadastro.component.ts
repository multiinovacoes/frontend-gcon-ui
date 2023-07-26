import { MessageService } from 'primeng/api';
import { TipoDocumentoService } from './../tipo-documento.service';
import { TipoDocumento } from './../../../core/models/tipo-documento.model';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-tipo-documento-cadastro',
  templateUrl: 'tipo-documento-cadastro.component.html',
  styleUrls: ['tipo-documento-cadastro.component.css']
})
export class TipoDocumentoCadastroComponent implements OnInit {

  tipoDocumento = new TipoDocumento();
  status = [
    { label: 'Ativo', value: 0 },
    { label: 'Inativo', value: 1 },
  ];



  constructor(
    private tipoDocumentoService: TipoDocumentoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private routeStateService: RouteStateService) { }

  ngOnInit() {
    var routeState = this.routeStateService.getCurrent();
    if (routeState.data > 0) {
      this.editarTipoDocumento(routeState.data);
    }else{
      this.tipoDocumento.status = 0;
    }
  }

  back() {
    this.routeStateService.loadPrevious();
  }

  editarTipoDocumento(codigo: number) {
    return this.tipoDocumentoService.editar(codigo)
    .then((tipoDocumento) => {
      this.tipoDocumento = tipoDocumento.tipoDocumentoDto
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.tipoDocumento.id)
  }


  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarTipoDocumento(form);
    } else {
      this.adicionarTipoDocumento(form);
    }
  }

  adicionarTipoDocumento(form: NgForm) {
    this.tipoDocumentoService.adicionar(this.tipoDocumento)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Tipo documento adicionado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTipoDocumento(form: NgForm) {
    this.tipoDocumentoService.atualizar(this.tipoDocumento)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Tipo documento atualizado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
