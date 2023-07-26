import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ExcelServiceService } from 'src/app/core/services/excel-service.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { User } from 'src/app/core/models/user.model';
import { Table } from 'primeng/table';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { RelatorioFiltro, RelatorioService } from '../../relatorio.service';



export class Paginacao {
  pagina = 0;
  itensPorPagina = 10;
}

@Component({
  selector: 'app-lista-detalhe',
  templateUrl: './lista-detalhe.component.html',
  styleUrls: ['./lista-detalhe.component.css']
})
export class ListaDetalheComponent implements OnInit {

  dados = [];
  buttonsImpressao = true;
  filtroPagina = new Paginacao();
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

  constructor(
    private relatorioService: RelatorioService,
    private errorHandler: ErrorHandlerService,
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

    if (routeState.data.natureza >= 0) {
      this.detalhe = false;
      this.filtroPagina.pagina = 0;
      this.relatorioService.listaDetalhe(routeState.data)
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
    else if (routeState.data.assunto >= 0) {
      this.detalhe = false;
      this.filtroPagina.pagina = 0;
      this.relatorioService.listaDetalheAssunto(routeState.data)
        .then(resultado => {
          this.atendimentos = resultado;
        }
        ).then(res => {
          this.loaderService.hide();
        })
        .catch(erro => this.errorHandler.handle(erro));
    } else if (routeState.data.resolutividade >= 0) {
      this.detalhe = false;
      this.filtroPagina.pagina = 0;
      this.relatorioService.listaDetalheResolutividade(routeState.data)
        .then(resultado => {
          this.atendimentos = resultado;
        }
        ).then(res => {
          this.loaderService.hide();
        })
        .catch(erro => this.errorHandler.handle(erro));
    }
  }

  ngOnDestroy() {
    this.loaderService.status.observers.forEach(function (element) {
      element.complete();
    });
  }


  back() {
    this.routeStateService.add('Relatório de Atendimento por Secretaria',
      '/relatorio/atendimento-secretaria', null, true);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.atendimentos, 'lista_detalhe');
  }

}
