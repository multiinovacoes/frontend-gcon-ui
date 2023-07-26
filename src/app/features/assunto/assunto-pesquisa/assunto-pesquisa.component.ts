import { Table } from 'primeng/table';
import { AreaService } from './../../area/area.service';
import { AssuntoFiltro, AssuntoService } from './../assunto.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouteStateService } from 'src/app//core/services/route-state.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-assunto-pesquisa',
  templateUrl: 'assunto-pesquisa.component.html',
  styleUrls: ['assunto-pesquisa.component.css']
})
export class AssuntoPesquisaComponent implements OnInit {

  assuntos = [];
  assunto!: any;
  filtro = new AssuntoFiltro();
  @ViewChild('tabela') grid: Table;
  areas = [];

  constructor(
    private assuntoService: AssuntoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private title: Title,
    private confirmation: ConfirmationService,
    private areaService: AreaService,
    private routeStateService: RouteStateService
  ) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de assunto');
    this.carregarAreas();
  }

  listar() {
    this.assuntoService.listar()
      .then(assuntos =>{
        this.assuntos = assuntos.assuntoDtoList;
      }
      )
      .catch(erro => this.errorHandler.handle(erro));
  }


  editarAssunto(codigo: number) {
    this.routeStateService.add('Edição de Assunto',
      '/main/assunto/assunto-cadastro', codigo, false);
  }

  novoAssunto() {
    this.routeStateService.add('Novo Assunto',
      '/main/assunto/assunto-cadastro', 0, false);
  }

  pesquisa() {
    this.assuntoService.pesquisar(this.filtro)
      .then(assuntos =>
        this.assuntos = assuntos)
      .catch(erro => this.errorHandler.handle(erro));
  }

  excluir(assunto: any) {
    this.assuntoService.excluir(assunto.id)
      .then(() => {
        this.pesquisa();
//        this.grid.reset();
        this.messageService.add({ severity: 'success', detail: 'Assunto excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  confirmarExclusao(assunto: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(assunto);
      }
    });
  }


  carregarAreas() {
    this.areaService.listar()
      .then(areas => {
        this.areas = areas.
          map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
