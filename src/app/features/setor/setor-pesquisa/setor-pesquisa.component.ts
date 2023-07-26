import { Table } from 'primeng/table';
import { SetorFiltro, SetorService } from './../setor.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RouteStateService } from 'src/app//core/services/route-state.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-setor-pesquisa',
  templateUrl: 'setor-pesquisa.component.html',
  styleUrls: ['setor-pesquisa.component.css']
})
export class SetorPesquisaComponent implements OnInit {

  setores = [];
  setor!: any;
  filtro = new SetorFiltro();
  @ViewChild('tabela') grid: Table;

  constructor(
    private setorService: SetorService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private routeStateService: RouteStateService
  ) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de setor');
    this.listar();
  }

  listar() {
    this.setorService.listar()
      .then(setores =>{
        this.setores = setores.setorDtoList;
      }
      )
      .catch(erro => this.errorHandler.handle(erro));
  }


  editarSetor(codigo: number) {
    this.routeStateService.add('Edição de Setor',
      '/main/setor/setor-cadastro', codigo, false);
  }

  novoSetor() {
    this.routeStateService.add('Novo Setor',
      '/main/setor/setor-cadastro', 0, false);
  }

  pesquisa() {
    this.setorService.pesquisar(this.filtro)
      .then(setores =>
        this.setores = setores.setorDtoList)
      .catch(erro => this.errorHandler.handle(erro));
  }

  excluir(setor: any) {
    this.setorService.excluir(setor.id)
      .then(() => {
        this.listar();
        this.grid.reset();
        this.messageService.add({ severity: 'success', detail: 'Setor excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  confirmarExclusao(setor: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(setor);
      }
    });
  }
}
