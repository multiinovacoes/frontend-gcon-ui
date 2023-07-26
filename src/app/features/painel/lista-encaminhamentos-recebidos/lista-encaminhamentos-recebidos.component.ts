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
  selector: 'app-lista-encaminhamentos-recebidos',
  templateUrl: './lista-encaminhamentos-recebidos.component.html',
  styleUrls: ['./lista-encaminhamentos-recebidos.component.css']
})
export class ListaEncaminhamentosRecebidosComponent implements OnInit {

  totalRegistros = 0;
  listaAtendimentosRecebidos = [];
  @ViewChild('tabela') grid: Table;
  filtro = new PaginacaoPainel();
  loading = false;
  showLoaderDialogEncaminhamentosRec = false;

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
        this.showLoaderDialogEncaminhamentosRec = val;
      });
      this.title.setTitle('Lista de Encaminhamentos Recebidos');
   
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
    this.atendimentoService.listaEncaminhamentosRecebidos(this.filtro)
      .then(resultado =>{
        this.totalRegistros = resultado.atendimentos.totalElements;
        this.listaAtendimentosRecebidos = resultado.atendimentos.content;
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
    if (this.listaAtendimentosRecebidos.length > 0) {
      this.listar(pagina);
    }
  }

  showAtendimento(idAtendimento: number){
    this.routeStateService.add('Edição de Atendimento',
      '/main/atendimento/atendimento-cadastro', idAtendimento, false);
  }

}
