import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { AtendimentoService } from '../../atendimento/atendimento.service';
import { PaginacaoPainel } from '../lista-novas-manifestacoes/lista-novas-manifestacoes.component';

@Component({
  selector: 'app-lista-manifestacoes-status',
  templateUrl: './lista-manifestacoes-status.component.html',
  styleUrls: ['./lista-manifestacoes-status.component.css']
})
export class ListaManifestacoesStatusComponent implements OnInit {

  totalRegistros = 0;
  atendimentos = [];
  @ViewChild('tabela') grid: Table;
  filtro = new PaginacaoPainel();
  loading = false;
  showLoaderDialogPainel = false;


  constructor(
    private atendimentoService: AtendimentoService,
    private errorHandler: ErrorHandlerService,
    private loaderService: LoaderService,
    private title: Title,
    private routeStateService: RouteStateService
  ) { }


     ngOnInit(): void {
      this.loaderService.status.subscribe((val: boolean) => {
        this.showLoaderDialogPainel = val;
      });
      this.title.setTitle('Atendimentos. Classif. e Não Encam.');
    
      this.listar();

    }

   ngOnDestroy() {
    this.loaderService.status.observers.forEach(function (element) {
      element.complete();
    });
  }


   listar(pagina = 0) {
    this.loaderService.show();
    this.filtro.pagina = pagina;
    this.atendimentoService.listaAtendimentosClassificadosNaoEncaminhados(this.filtro)
      .then(resultado =>{
      this.totalRegistros = resultado.atendimentos.totalElements;
        this.atendimentos = resultado.atendimentos.content;
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
      this.listar(pagina);
    }
  }

  showAtendimento(idAtendimento: number){
    this.routeStateService.add('Edição de Atendimento',
      '/main/atendimento/atendimento-cadastro', idAtendimento, false);
  }

}
