import { LoaderService } from 'src/app/core/services/loader.service';
import { AtendimentoService, AtendimentoFilter } from './../atendimento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouteStateService } from 'src/app//core/services/route-state.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';  
import { UserDataService } from 'src/app/features/seguranca/user-data.service';
import { SessionService } from 'src/app/core/services/session.service';
import { UtilService } from 'src/app/util.service';

import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: 'app-atendimento-pesquisa',
  templateUrl: 'atendimento-pesquisa.component.html',
  styleUrls: ['atendimento-pesquisa.component.css']
})
export class AtendimentoPesquisaComponent implements OnInit {

  totalRegistros = 0;
  atendimentos = [];
  atendimento!: any;
  showLoaderDialogAtendimentoPesquisa = false;
  filtro = new AtendimentoFilter();
  @ViewChild('tabela') grid: Table;
  loading = false;
  assuntos = [];
  permissoes!: any;
  statuss = [];

  constructor(
    private atendimentoService: AtendimentoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private userDataService: UserDataService,
    private sessionService: SessionService,
    private loaderService: LoaderService,
    private utilService: UtilService,
    private title: Title,
    private confirmation: ConfirmationService,
    private routeStateService: RouteStateService
  ) {

  }

   ngOnInit(): void {
      this.loaderService.status.subscribe((val: boolean) => {
      this.showLoaderDialogAtendimentoPesquisa = val;
    });
     this.title.setTitle('Pesquisa de atendimentos');
     this.permissoes = this.userDataService.permissoesUsuario();
     this.statuss = this.utilService.listaStatusManifestacao();

     if (this.sessionService.getItem('filtroManifestacao')) {
      this.filtro = this.sessionService.getItem('filtroManifestacao');
      this.totalRegistros = this.sessionService.getItem('resultadoManifestacao').atendimentos.totalElements;
      this.atendimentos = this.sessionService.getItem('resultadoManifestacao').atendimentos.content;
     }
  }

   ngOnDestroy() {
    this.loaderService.status.observers.forEach(function (element) {
      element.complete();
    });
  }


  listar() {
    this.atendimentoService.listar()
      .then(atendimentos =>{
        this.atendimentos = atendimentos.atendimentoDtoList;
      }
      )
      .catch(erro => this.errorHandler.handle(erro));
  }


  editarAtendimento(codigo: number) {
    this.sessionService.setItem('filtroManifestacao', this.filtro);
    this.routeStateService.add('Edição de Atendimento',
      '/main/atendimento/atendimento-cadastro', codigo, false);
  }

  novoAtendimento() {
    this.routeStateService.add('Novo Atendimento',
      '/main/atendimento/atendimento-cadastro', 0, false);
  }

  pesquisa(pagina = 0) {

    if (this.filtro.dataInicio === null && this.filtro.dataFinal === null && this.filtro.documento === null && this.filtro.palavraChave === null && this.filtro.protocolo === null && this.filtro.solicitante === null){
      Swal.fire("Informe no mínimo um parâmetro de consulta", "", "warning");
      return;
    }

    this.loaderService.show();
    this.filtro.pagina = pagina;
    this.atendimentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.atendimentos.totalElements;
        this.atendimentos = resultado.atendimentos.content;
        this.sessionService.setItem('resultadoManifestacao', resultado);
      }
      ).then(res =>{
        this.loaderService.hide();
      })
      .catch(erro => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      })
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    if (this.atendimentos.length > 0) {
      this.pesquisa(pagina);
    }
  }

  excluir(atendimento: any) {
    this.atendimentoService.excluir(atendimento.id)
      .then(() => {
        this.grid.reset();
        this.listar();
        this.messageService.add({ severity: 'success', detail: 'Atendimento excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

    cancelar(atendimento: any) {
     this.loaderService.show();
     this.atendimentoService.cancelar(atendimento.id)
      .then( res => {
         this.atendimentoService.pesquisar(this.filtro)
        .then(resultado => {
          this.totalRegistros = resultado.atendimentos.totalElements;
          this.atendimentos = resultado.atendimentos.content;
          }).then(res => {
          this.messageService.add({ severity: 'success', detail: 'Atendimento cancelado com sucesso!' });
          this.loaderService.hide();
          })
      })
      .catch(erro => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }


  confirmarExclusao(atendimento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja cancelar esta manifestação?',
      accept: () => {
        this.cancelar(atendimento);
      }
    });
  }
}
