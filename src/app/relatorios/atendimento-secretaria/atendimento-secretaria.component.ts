import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/core/models/user.model';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ExcelServiceService } from 'src/app/core/services/excel-service.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SessionService } from 'src/app/core/services/session.service';
import { UtilService } from 'src/app/util.service';
import { RelatorioFiltro, RelatorioService } from '../relatorio.service';

import * as moment from 'moment';
import { AreaService } from 'src/app/features/area/area.service';

import Swal from "sweetalert2/dist/sweetalert2.js";
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { SetorService } from 'src/app/features/setor/setor.service';

@Component({
  selector: 'app-atendimento-secretaria',
  templateUrl: './atendimento-secretaria.component.html',
  styleUrls: ['./atendimento-secretaria.component.css']
})
export class AtendimentoSecretariaComponent implements OnInit {

  filtro = new RelatorioFiltro();
  atendimentoArea = [];
  areas!: any;
  dadosResolutividade = [];
  dadosNatureza = [];
  dadosAssunto = [];
  showLoaderDialogRelatorio = false;
  width = "800";
  height = "400";
  type = "pie3d";
  dataFormat = "json";
  dataSourceResolutividade = {};
  dataSourceNatureza = {};
  dataSourceAssunto = {};
  tiposGrafico!: any;
  total!: number;
  totalNatureza!: number;
  totalAssunto!: number;
  data = new Date();
  user: User;
  chartData: any;
  chartDataNatureza: any;
  chartDataAssunto: any;
  descricaoArea: string;



  constructor(
    private relatorioService: RelatorioService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private routeStateService: RouteStateService,
    private setorService: SetorService,
    private sessionService: SessionService,
    private utilService: UtilService,
    private loaderService: LoaderService,
    private excelService: ExcelServiceService
  ) {
  }

  ngOnInit(): void {
    this.user = this.sessionService.getItem("currentUser");
    this.carregarAreas();
    this.tiposGrafico = this.utilService.listaTiposGrafico();
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoaderDialogRelatorio = val;
    });

    if (this.sessionService.getItem('filtro')) {
      this.filtro.dataInicial = new Date(this.sessionService.getItem('filtro').dataInicial);
      this.filtro.dataFinal = new Date(this.sessionService.getItem('filtro').dataFinal);
      this.filtro.area = this.sessionService.getItem('filtro').area;
      this.dadosResolutividade = this.sessionService.getItem('resultado').listaResolutividade;
      this.dadosNatureza = this.sessionService.getItem('resultado').listaNatureza;
      this.dadosAssunto = this.sessionService.getItem('resultado').listaAssunto;
      this.descricaoArea = this.sessionService.getItem('resultado').descricaoArea;
      this.chartData = this.sessionService.getItem('resultado').listaResolutividade;
      this.chartDataNatureza = this.sessionService.getItem('resultado').listaNatureza;
      this.chartDataAssunto = this.sessionService.getItem('resultado').listaAssunto;
      this.calculateTotal();
      this.calculateTotalNatureza();
      this.calculateTotalAssunto();
      this.dataSourceResolutividade = {
        chart: {
          formatNumber: "0",
          formatNumberScale: "0",
          xFormatNumberScale: "0",
          yFormatNumberScale: "0",
          theme: "gammel"
        },
        data: this.chartData
      };
      this.dataSourceNatureza = {
        chart: {
          formatNumber: "0",
          formatNumberScale: "0",
          xFormatNumberScale: "0",
          yFormatNumberScale: "0",
          theme: "gammel"
        },
        data: this.chartDataNatureza
      };
      this.dataSourceAssunto = {
        chart: {
          formatNumber: "0",
          formatNumberScale: "0",
          xFormatNumberScale: "0",
          yFormatNumberScale: "0",
          theme: "gammel"
        },
        data: this.chartDataAssunto
      };
      this.sessionService.removeItem('filtro');
    } else {
      this.filtro.dataInicial = new Date(moment(new Date(), "YYYY-MM-DD").startOf('month').toString());
      this.filtro.dataFinal = new Date(moment(new Date(), "YYYY-MM-DD").endOf('month').toString());
    }

  }

  ngOnDestroy() {
    this.loaderService.status.observers.forEach(function (element) {
      element.complete();
    });
  }


  carregarAreas() {
    this.setorService.listar()
      .then(areas => {
        this.areas = areas.
          map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisa() {
    if (this.filtro.dataFinal.getTime() < this.filtro.dataInicial.getTime()) {
      Swal.fire(
        "Período inválido",
        "A data final deve ser maior que a data inicial",
        "warning"
      );
      return false;
    }
    this.type = this.filtro.tipoGrafico;
    this.loaderService.show();
    this.relatorioService.pesquisarSecretaria(this.filtro)
      .then(resultado => {
        if (resultado.length == 0) {
          this.messageService.add({ severity: 'success', detail: 'Nenhuma manifestação encontrada!' });
        } else {
          this.sessionService.setItem('resultado', resultado);
          this.dadosResolutividade = resultado.listaResolutividade;
          this.dadosNatureza = resultado.listaNatureza;
          this.dadosAssunto = resultado.listaAssunto;
          this.descricaoArea = resultado.descricaoArea;
          this.chartData = resultado.listaResolutividade;
          this.chartDataNatureza = resultado.listaNatureza;
          this.chartDataAssunto = resultado.listaAssunto;
        }
      }).then(res => {
        this.calculateTotal();
        this.calculateTotalNatureza();
        this.calculateTotalAssunto();
        this.dataSourceResolutividade = {
          chart: {
            formatNumber: "0",
            formatNumberScale: "0",
            xFormatNumberScale: "0",
            yFormatNumberScale: "0",
            theme: "gammel"
          },
          data: this.chartData
        };
        this.dataSourceNatureza = {
          chart: {
            formatNumber: "0",
            formatNumberScale: "0",
            xFormatNumberScale: "0",
            yFormatNumberScale: "0",
            theme: "gammel"
          },
          data: this.chartDataNatureza
        };
        this.dataSourceAssunto = {
          chart: {
            formatNumber: "0",
            formatNumberScale: "0",
            xFormatNumberScale: "0",
            yFormatNumberScale: "0",
            theme: "gammel"
          },
          data: this.chartDataAssunto
        };
      })
      .then(res => {
        this.loaderService.hide();
      })
      .catch(erro => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.dadosResolutividade, 'relatorio_secretaria');
  }

  calculateTotal() {
    let total = 0;
    for (let valor of this.dadosResolutividade) {
      total += valor.value;
    }

    this.total = total;
  }


  calculateTotalNatureza() {
    let totalNatureza = 0;
    for (let valor of this.dadosNatureza) {
      totalNatureza += valor.value;
    }
    this.totalNatureza = totalNatureza;
  }

  calculateTotalAssunto() {
    let totalAssunto = 0;
    for (let valor of this.dadosAssunto) {
      totalAssunto += valor.value;
    }
    this.totalAssunto = totalAssunto;
  }

  qtdAtendimentosNatureza() {
    this.type = this.filtro.tipoGrafico;
    this.relatorioService.
      pesquisarSecretariaNatureza(this.filtro).
      then(resultado => {
        this.dadosNatureza = resultado.listaNatureza;
        this.chartDataNatureza = resultado.listaNatureza;
        this.descricaoArea = resultado.area;
        this.calculateTotalNatureza();
      }).then(res => {
        this.dataSourceNatureza = {
          chart: {
            formatNumber: "0",
            formatNumberScale: "0",
            xFormatNumberScale: "0",
            yFormatNumberScale: "0",
            theme: "gammel"
          },
          data: this.chartDataNatureza
        };
      })
  }

  listarDetalheAssunto(codigo: any) {
    this.filtro.assunto = codigo;
    this.sessionService.setItem('filtro', this.filtro);
    this.routeStateService.add('Lista de Detalhe Por Assunto',
      '/relatorio/lista-detalhe-encaminhamento', this.filtro, false);
  }

  listarDetalhe(codigo: any) {
    this.filtro.natureza = codigo;
    this.sessionService.setItem('filtro', this.filtro);
    this.routeStateService.add('Lista de Detalhe por Natureza',
      '/relatorio/lista-detalhe-encaminhamento', this.filtro, false);
  }

  listarDetalheResolutividade(codigo: any) {
    this.filtro.resolutividade = codigo;
    this.sessionService.setItem('filtro', this.filtro);
    this.routeStateService.add('Lista de Detalhe por Resolutividade',
      '/relatorio/lista-detalhe-encaminhamento', this.filtro, false);
  }

  qtdAtendimentos() {
    this.type = this.filtro.tipoGrafico;
    this.relatorioService.
      pesquisarSecretaria(this.filtro).
      then(resultado => {
        this.dadosResolutividade = resultado.listaResolutividade;
        this.chartData = resultado.listaResolutividade;
        this.dadosNatureza = resultado.listaNatureza;
        this.chartDataNatureza = resultado.listaNatureza;
        this.descricaoArea = resultado.area;
        this.calculateTotal();
      }).then(res => {
        this.dataSourceResolutividade = {
          chart: {
            formatNumber: "0",
            formatNumberScale: "0",
            xFormatNumberScale: "0",
            yFormatNumberScale: "0",
            theme: "gammel"
          },
          data: this.chartData
        };
        this.dataSourceNatureza = {
          chart: {
            formatNumber: "0",
            formatNumberScale: "0",
            xFormatNumberScale: "0",
            yFormatNumberScale: "0",
            theme: "gammel"
          },
          data: this.chartDataNatureza
        };
      })
  }
}
