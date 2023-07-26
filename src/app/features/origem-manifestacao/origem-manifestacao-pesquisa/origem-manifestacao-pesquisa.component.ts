import { Table } from 'primeng/table';
import { OrigemManifestacaoFiltro, OrigemManifestacaoService } from './../origem-manifestacao.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouteStateService } from 'src/app//core/services/route-state.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-origem-manifestacao-pesquisa',
  templateUrl: 'origem-manifestacao-pesquisa.component.html',
  styleUrls: ['origem-manifestacao-pesquisa.component.css']
})
export class OrigemManifestacaoPesquisaComponent implements OnInit {

  origensManifestacoes = [];
  origemManifestacao!: any;
  filtro = new OrigemManifestacaoFiltro();
  @ViewChild('tabela') grid: Table;

  constructor(
    private origemManifestacaoService: OrigemManifestacaoService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private routeStateService: RouteStateService
  ) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de origens manifestações');
    this.listar();
  }

  listar() {
    this.origemManifestacaoService.listar()
      .then(origensManifestacoes =>{
        this.origensManifestacoes = origensManifestacoes;
      }
      )
      .catch(erro => this.errorHandler.handle(erro));
  }


  editarOrigemManifestacao(codigo: number) {
    this.routeStateService.add('Edição de Origem Manifestação',
      '/main/origem-manifestacao/origem-manifestacao-cadastro', codigo, false);
  }

  novaOrigemManifestacao() {
    this.routeStateService.add('Nova Origem Manifestação',
      '/main/origem-manifestacao/origem-manifestacao-cadastro', 0, false);
  }

  pesquisa() {
    this.origemManifestacaoService.pesquisar(this.filtro)
      .then(origensManifestacoes =>
        this.origensManifestacoes = origensManifestacoes.origemManifestacaoDtoList)
      .catch(erro => this.errorHandler.handle(erro));
  }

  excluir(origemManifestacao: any) {
    this.origemManifestacaoService.excluir(origemManifestacao.id)
      .then(() => {
        this.listar();
        this.grid.reset();
        this.messageService.add({ severity: 'success', detail: 'Origem excluída com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  confirmarExclusao(origemManifestacao: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(origemManifestacao);
      }
    });
  }
}
