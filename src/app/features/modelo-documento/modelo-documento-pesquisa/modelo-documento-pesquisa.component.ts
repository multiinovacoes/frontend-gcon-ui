import { Table } from 'primeng/table';
import { ModeloDocumentoFiltro, ModeloDocumentoService } from './../modelo-documento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouteStateService } from 'src/app//core/services/route-state.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-modelo-documento-pesquisa',
  templateUrl: 'modelo-documento-pesquisa.component.html',
  styleUrls: ['modelo-documento-pesquisa.component.css']
})
export class ModeloDocumentoPesquisaComponent implements OnInit {

  modelos = [];
  modelo!: any;
  filtro = new ModeloDocumentoFiltro();
  @ViewChild('tabela') grid: Table;

  constructor(
    private modeloDocumentoService: ModeloDocumentoService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private routeStateService: RouteStateService
  ) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de modelos de documentos');
    this.listar();
  }

  listar() {
    this.modeloDocumentoService.listar()
      .then(modelos =>{
        this.modelos = modelos.modeloDocumentoDtoList;
      }
      )
      .catch(erro => this.errorHandler.handle(erro));
  }


  editarModelo(codigo: number) {
    this.routeStateService.add('Edição de Modelo Documento',
      '/main/modelo-documento/modelo-documento-cadastro', codigo, false);
  }

  novoModelo() {
    this.routeStateService.add('Novo Modelo Documento',
      '/main/modelo-documento/modelo-documento-cadastro', 0, false);
  }

  pesquisa() {
    this.modeloDocumentoService.pesquisar(this.filtro)
      .then(modelos =>
        this.modelos = modelos.modeloDocumentoDtoList)
      .catch(erro => this.errorHandler.handle(erro));
  }

  excluir(modelo: any) {
    this.modeloDocumentoService.excluir(modelo.id)
      .then(() => {
        this.listar();
        this.grid.reset();
        this.messageService.add({ severity: 'success', detail: 'Modelo excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  confirmarExclusao(modelo: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(modelo);
      }
    });
  }
}
