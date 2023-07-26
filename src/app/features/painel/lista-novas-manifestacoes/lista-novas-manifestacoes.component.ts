import { AtendimentoService } from './../../atendimento/atendimento.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { RouteStateService } from 'src/app//core/services/route-state.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

export class PaginacaoPainel {
  pagina = 0;
  itensPorPagina = 10;
}

@Component({
  selector: 'app-painel',
  templateUrl: 'lista-novas-manifestacoes.component.html',
  styleUrls: ['lista-novas-manifestacoes.component.css']
})
export class ListaNovasManifestacoesComponent implements OnInit {

  totalRegistros = 0;
  atendimentos = [];
  @ViewChild('tabela') grid: Table;
  filtro = new PaginacaoPainel();
  loading = false;
  showLoaderDialogPainel = false;


  constructor(
    private atendimentoService: AtendimentoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private title: Title,
    private confirmation: ConfirmationService,
    private routeStateService: RouteStateService
  ) { }


     ngOnInit(): void {
      this.loaderService.status.subscribe((val: boolean) => {
        this.showLoaderDialogPainel = val;
      });
      this.title.setTitle('Lista de atendimentos novos');
    
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
    this.atendimentoService.listaNovosAtendimentos(this.filtro)
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
