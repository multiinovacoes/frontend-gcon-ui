import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { User } from 'src/app/core/models/user.model';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ExcelServiceService } from 'src/app/core/services/excel-service.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { RelatorioFiltro, RelatorioService } from '../../relatorio.service';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-lista-detalhe-callcenter',
  templateUrl: './lista-detalhe-callcenter.component.html',
  styleUrls: ['./lista-detalhe-callcenter.component.css']
})
export class ListaDetalheCallcenterComponent implements OnInit {

  dados = [];
  buttonsImpressao = true;
  totalRegistros = 0;
  atendimentos = [];
  filtro = new RelatorioFiltro();
  @ViewChild('tabela') grid: Table;
  ocultaGrafico = true;
  tiposGrafico!: any;
  displayModalPrint!: boolean;
  graficoNatureza!: string;
  total!: number;
  data = new Date();
  user: User;
  detalhe = true;
  showLoaderDialog = false;
  nomeAtendente!: string;

  constructor(
    private relatorioService: RelatorioService,
    private errorHandler: ErrorHandlerService,
    private sessionService: SessionService,
    private routeStateService: RouteStateService,
    private loaderService: LoaderService,
    private excelService: ExcelServiceService
  ) { }

  ngOnInit(): void {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoaderDialog = val;
    });
    this.loaderService.show();
    var routeState = this.routeStateService.getCurrent();
    this.filtro = routeState.data;
    this.filtro.dataInicial = new Date(this.filtro.dataInicial);
    this.filtro.dataFinal = new Date(this.filtro.dataFinal);
  
    if (routeState.data.usuario > 0) {
      this.nomeAtendente = routeState.data.nomeAtendente;
      this.detalhe = false;
      this.relatorioService.listaDetalheProdutividade(routeState.data)
        .then(resultado => {
          this.atendimentos = resultado;
        }
        ).then(res => {
          this.loaderService.hide();
        })
        .catch(erro => {
          this.loaderService.hide();
          this.errorHandler.handle(erro);
          }
        );
    }
  }

  ngOnDestroy() {
    this.loaderService.status.observers.forEach(function (element) {
      element.complete();
    });
  }


  back() {
    this.routeStateService.add('Relatório de Produtividade Call Center',
      '/relatorio/produtividade-callcenter', null, true);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.atendimentos, 'lista_detalhe_produtividade_callcenter');
  }

  showAtendimento(idAtendimento: number){
    this.sessionService.setItem('filtro', this.filtro);
     this.routeStateService.add('Edição de Atendimento',
       '/main/atendimento/atendimento-cadastro', idAtendimento, false);
   }


}
