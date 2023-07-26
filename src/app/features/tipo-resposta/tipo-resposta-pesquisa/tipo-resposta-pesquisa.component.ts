import { Table } from 'primeng/table';
import { TipoRespostaFiltro, TipoRespostaService } from './../tipo-resposta.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouteStateService } from 'src/app//core/services/route-state.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-tipo-resposta-pesquisa',
  templateUrl: 'tipo-resposta-pesquisa.component.html',
  styleUrls: ['tipo-resposta-pesquisa.component.css']
})
export class TipoRespostaPesquisaComponent implements OnInit {

  tiposRespostas = [];
  tipoResposta!: any;
  filtro = new TipoRespostaFiltro();
  @ViewChild('tabela') grid: Table;

  constructor(
    private tipoRespostaService: TipoRespostaService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private routeStateService: RouteStateService
  ) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de tipos de resposta');
    this.listar();
  }

  listar() {
    this.tipoRespostaService.listar()
      .then(tiposRespostas =>{
        this.tiposRespostas = tiposRespostas;
      }
      )
      .catch(erro => this.errorHandler.handle(erro));
  }


  editarTipoResposta(codigo: number) {
    this.routeStateService.add('Edição de Tipo Resposta',
      '/main/tipo-resposta/tipo-resposta-cadastro', codigo, false);
  }

  novoTipoResposta() {
    this.routeStateService.add('Novo Tipo Resposta',
      '/main/tipo-resposta/tipo-resposta-cadastro', 0, false);
  }

  pesquisa() {
    this.tipoRespostaService.pesquisar(this.filtro)
      .then(tiposRespostas =>
        this.tiposRespostas = tiposRespostas.tipoRespostaDtoList)
      .catch(erro => this.errorHandler.handle(erro));
  }

  excluir(tipoResposta: any) {
    this.tipoRespostaService.excluir(tipoResposta.id)
      .then(() => {
        this.listar();
        this.grid.reset();
        this.messageService.add({ severity: 'success', detail: 'Tipo resposta excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  confirmarExclusao(tipoResposta: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(tipoResposta);
      }
    });
  }
}
