import { Table } from 'primeng/table';
import { TipoDocumentoFiltro, TipoDocumentoService } from './../tipo-documento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouteStateService } from 'src/app//core/services/route-state.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-tipo-documento-pesquisa',
  templateUrl: 'tipo-documento-pesquisa.component.html',
  styleUrls: ['tipo-documento-pesquisa.component.css']
})
export class TipoDocumentoPesquisaComponent implements OnInit {

  tiposDocumento = [];
  tipoDocumento!: any;
  filtro = new TipoDocumentoFiltro();
  @ViewChild('tabela') grid: Table;

  constructor(
    private tipoDocumentoService: TipoDocumentoService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private routeStateService: RouteStateService
  ) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de tipos de documentos');
    this.listar();
  }

  listar() {
    this.tipoDocumentoService.listar()
      .then(tiposDocumento =>{
        this.tiposDocumento = tiposDocumento;
      }
      )
      .catch(erro => this.errorHandler.handle(erro));
  }


  editarTipoDocumento(codigo: number) {
    this.routeStateService.add('Edição de Tipo Documento',
      '/main/tipo-documento/tipo-documento-cadastro', codigo, false);
  }

  novoTipoDocumento() {
    this.routeStateService.add('Novo Tipo Documento',
      '/main/tipo-documento/tipo-documento-cadastro', 0, false);
  }

  pesquisa() {
    this.tipoDocumentoService.pesquisar(this.filtro)
      .then(tiposDocumento =>
        this.tiposDocumento = tiposDocumento.tipoDocumentoDtoList)
      .catch(erro => this.errorHandler.handle(erro));
  }

  excluir(tipoDocumento: any) {
    this.tipoDocumentoService.excluir(tipoDocumento.id)
      .then(() => {
        this.listar();
        this.grid.reset();
        this.messageService.add({ severity: 'success', detail: 'Tipo documento excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  confirmarExclusao(tipoDocumento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(tipoDocumento);
      }
    });
  }
}
