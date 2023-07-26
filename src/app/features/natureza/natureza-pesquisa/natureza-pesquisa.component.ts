import { Table } from 'primeng/table';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NaturezaFiltro, NaturezaService } from 'src/app/features/natureza/natureza.service';
import { RouteStateService } from 'src/app//core/services/route-state.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-natureza-pesquisa',
  templateUrl: 'natureza-pesquisa.component.html',
  styleUrls: ['natureza-pesquisa.component.css']
})
export class NaturezaPesquisaComponent implements OnInit {

  naturezas = [];
  natureza!: any;
  totalRegistros = 0;
  filtro = new NaturezaFiltro();
  @ViewChild('tabela') grid: Table;


  constructor(
    private naturezaService: NaturezaService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private routeStateService: RouteStateService
  ) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de natureza');
    this.listar();
  }

  listar() {
    this.naturezaService.listar()
      .then(naturezas =>{
        this.naturezas = naturezas;
      }
      )
      .catch(erro => this.errorHandler.handle(erro));
  }


  editarNatureza(codigo: number) {
    this.routeStateService.add('Edição de Natureza',
      '/main/natureza/natureza-cadastro', codigo, false);
  }

  novaNatureza() {
    this.routeStateService.add('Nova Natureza',
      '/main/natureza/natureza-cadastro', 0, false);
  }

  pesquisa() {
    this.naturezaService.pesquisar(this.filtro)
      .then(naturezas =>
        this.naturezas = naturezas.naturezaDtoList)
      .catch(erro => this.errorHandler.handle(erro));
  }

  excluir(natureza: any) {
    this.naturezaService.excluir(natureza.id)
      .then(() => {
          this.listar();
          this.grid.reset();
          this.messageService.add({ severity: 'success', detail: 'Natureza excluída com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  confirmarExclusao(natureza: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(natureza);
      }
    });
  }
}
