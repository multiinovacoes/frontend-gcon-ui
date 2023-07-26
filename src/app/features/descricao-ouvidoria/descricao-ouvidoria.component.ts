import { MessageService } from 'primeng/api';
import { DescricaoOuvidoriaService } from './descricao-ouvidoria.service';
import { DescricaoOuvidoria } from './../../core/models/descricao-ouvidoria.model';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { NgForm } from '@angular/forms';


import  ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-descricao-ouvidoria',
  templateUrl: 'descricao-ouvidoria.component.html',
  styleUrls: ['descricao-ouvidoria.component.css']
})
export class DescricaoOuvidoriaComponent implements OnInit {

  descricaoOuvidoria = new DescricaoOuvidoria();

  public Editor = ClassicEditor;


  constructor(
    private descricaoOuvidoriaService: DescricaoOuvidoriaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private routeStateService: RouteStateService) { }

  ngOnInit() {
    var routeState = this.routeStateService.getCurrent();
    this.editar();
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
    return this.descricaoOuvidoriaService.editar()
    .then((descricaoOuvidoria) => {
      this.descricaoOuvidoria = descricaoOuvidoria.descricaoOuvidoriaDto
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.descricaoOuvidoria.id)
  }

  adicionar(form: NgForm) {
    this.descricaoOuvidoriaService.adicionar(this.descricaoOuvidoria)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Mensagem cadastrada com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  atualizar(form: NgForm) {
    this.descricaoOuvidoriaService.atualizar(this.descricaoOuvidoria)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Mensagem atualizada com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


}
