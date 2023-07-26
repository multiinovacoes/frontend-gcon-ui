import { Component, OnInit, ViewChild } from '@angular/core';
import { Paginacao } from '../../atendimento-natureza/lista-detalhe/lista-detalhe.component';
import { RelatorioFiltro, RelatorioService } from '../../relatorio.service';
import { Table } from 'primeng/table';
import { User } from 'src/app/core/models/user.model';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ExcelServiceService } from 'src/app/core/services/excel-service.service';

@Component({
  selector: 'app-lista-detalhe-assunto',
  templateUrl: './lista-detalhe-assunto.component.html',
  styleUrls: ['./lista-detalhe-assunto.component.css']
})
export class ListaDetalheAssuntoComponent implements OnInit {

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
    this.detalhe = false;
    this.filtroPagina.pagina = 0;
    this.relatorioService.listaDetalheAssuntoAgrupado(routeState.data)
      .then(resultado => {
        this.atendimentos = resultado;
      }
      ).then(res => {
        this.loaderService.hide();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  ngOnDestroy() {
    this.loaderService.status.observers.forEach(function (element) {
      element.complete();
    });
  }


  back() {
    this.routeStateService.add('Relatório de Atendimento por Assunto',
      '/relatorio/atendimento-assunto', null, true);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.atendimentos, 'lista_detalhe_assunto');
  }
}
