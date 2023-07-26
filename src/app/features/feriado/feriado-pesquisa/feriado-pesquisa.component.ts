import { Table } from 'primeng/table';
import { FeriadoFiltro, FeriadoService } from './../feriado.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouteStateService } from 'src/app//core/services/route-state.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-feriado-pesquisa',
  templateUrl: 'feriado-pesquisa.component.html',
  styleUrls: ['feriado-pesquisa.component.css']
})
export class FeriadoPesquisaComponent implements OnInit {

  feriados = [];
  feriado!: any;
  filtro = new FeriadoFiltro();
  @ViewChild('tabela') grid: Table;

  constructor(
    private feriadoService: FeriadoService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private routeStateService: RouteStateService
  ) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de feriados');
    this.listar();
  }

  listar() {
    this.feriadoService.listar()
      .then(feriados =>{
        this.feriados = feriados.feriadoDtoList;
      }
      )
      .catch(erro => this.errorHandler.handle(erro));
  }


  editarFeriado(codigo: number) {
    this.routeStateService.add('Edição de Feriado',
      '/main/feriado/feriado-cadastro', codigo, false);
  }

  novoFeriado() {
    this.routeStateService.add('Novo Feriado',
      '/main/feriado/feriado-cadastro', 0, false);
  }

  pesquisa() {
    this.feriadoService.pesquisar(this.filtro)
      .then(feriados =>
        this.feriados = feriados.feriadoDtoList)
      .catch(erro => this.errorHandler.handle(erro));
  }

  excluir(feriado: any) {
    this.feriadoService.excluir(feriado.id)
      .then(() => {
        this.listar();
        this.grid.reset();
        this.messageService.add({ severity: 'success', detail: 'Feriado excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  confirmarExclusao(feriado: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(feriado);
      }
    });
  }
}
