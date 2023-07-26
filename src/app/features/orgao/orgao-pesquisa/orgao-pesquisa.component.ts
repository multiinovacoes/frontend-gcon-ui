import { Table } from 'primeng/table';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OrgaoFiltro, OrgaoService } from 'src/app/features/orgao/orgao.service';
import { RouteStateService } from 'src/app//core/services/route-state.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-orgao-pesquisa',
  templateUrl: 'orgao-pesquisa.component.html',
  styleUrls: ['orgao-pesquisa.component.css']
})
export class OrgaoPesquisaComponent implements OnInit {

  orgaos = [];
  orgao!: any;
  filtro = new OrgaoFiltro();
  @ViewChild('tabela') grid: Table;

  constructor(
    private orgaoService: OrgaoService,
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
    this.orgaoService.listar()
      .then(orgaos =>{
        this.orgaos = orgaos.orgaoDtoList;
      }
      )
      .catch(erro => this.errorHandler.handle(erro));
  }


  editarOrgao(codigo: number) {
    this.routeStateService.add('Edição de Empresa',
      '/main/orgao/orgao-cadastro', codigo, false);
  }

  novoOrgao() {
    this.routeStateService.add('Nova Empresa',
      '/main/orgao/orgao-cadastro', 0, false);
  }

  pesquisa() {
    this.orgaoService.pesquisar(this.filtro)
      .then(orgaos =>
        this.orgaos = orgaos.orgaoDtoList)
      .catch(erro => this.errorHandler.handle(erro));
  }

  excluir(orgao: any) {
    this.orgaoService.excluir(orgao.id)
      .then(() => {
        this.listar();
        this.grid.reset();
        this.messageService.add({ severity: 'success', detail: 'Empresa excluída com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  confirmarExclusao(orgao: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(orgao);
      }
    });
  }
}
