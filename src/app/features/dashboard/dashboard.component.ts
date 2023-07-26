import { LoaderService } from 'src/app/core/services/loader.service';
import { EncaminhamentoService } from './../atendimento/encaminhamento/encaminhamento.service';
import { AtendimentoService } from './../atendimento/atendimento.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


import { ChartOptions } from 'chart.js';
import { UserDataService } from '../seguranca/user-data.service';

import * as moment from 'moment'




@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  barChartData: any;

  barChartDataSecretaria: any;

  qtdNovosAtendimentos: number;

  qtdEncaminhamentosRecebidos: number;

  qtdAtendimentosMes: number;

  qtdAtendimentosMesConcluidos: number;

  dataSourceSecretaria = {};

  dataSourceNatureza = {};

  chartDataSecretaria: any;

  chartDataNatureza: any;

  showLoaderDialogDashboard = false;

  width = "100%";
  height = "300";

  permissoes!: any;


  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
  public pieChartDatasets = [ {
    data: [ 300, 500, 100 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];




  msgs: any[];

  options = {
    showAllTooltips: false,
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          ticks: {
              min: 0
          }
      }]
     }
  };

  constructor(
    private loaderService: LoaderService,
     private title: Title,
     private userDataService: UserDataService,
    private atendimentoService: AtendimentoService,
    private encaminhamentoService: EncaminhamentoService) {

  }

 ngOnDestroy() {
    this.loaderService.status.observers.forEach(function (element) {
      element.complete();
    });
  }

  ngOnInit() {
      this.loaderService.status.subscribe((val: boolean) => {
        this.showLoaderDialogDashboard = val;
      });
      this.permissoes = this.userDataService.permissoesUsuario();
      this.title.setTitle('Dashboard');
      const data = moment();
    this.loaderService.show();
    this.novosAtendimentos();
    this.encaminhamentosRecebidos();
    this.qtdAtendimentosMesAno(data.month()+1, data.year());
    this.qtdAtendimentosMesAnoConcluidos();
    this.qtdAtendimentosNaturezas(data.month()+1, data.year());
    this.qtdAtendimentosSecretaria(data.month()+1, data.year());
  }


    novosAtendimentos() {
    this.atendimentoService.
     novosAtendimentos().
       then(resultado => {
         this.qtdNovosAtendimentos = resultado;
       })
    }

    qtdAtendimentosMesAno(mes: any, ano:any) {
    this.atendimentoService.
     qtdAtendimentosMes(mes, ano).
       then(resultado => {
         this.qtdAtendimentosMes = resultado;
       })
    }

    encaminhamentosRecebidos() {
    this.encaminhamentoService.
     encaminhamentosRecebidos().
       then(resultado => {
         this.qtdEncaminhamentosRecebidos = resultado;
       })
    }

    qtdAtendimentosMesAnoConcluidos() {
    this.atendimentoService.
     qtdAtendimentosMesConcluidos().
       then(resultado => {
         this.qtdAtendimentosMesConcluidos = resultado;
       })
    }


  qtdAtendimentosNaturezas(mes: any, ano: any) {
    this.atendimentoService.
    qtdAtendimentosNaturezaDashboard(mes, ano).
        then(resultado => {
          this.chartDataNatureza = resultado;
        
     }).then(res => {
     // STEP 3 - Chart Configuration
    this.dataSourceNatureza = {
      chart: {
        //Set the chart caption
        caption: "Naturezas mais demandadas",
        //Set the chart subcaption
        subCaption: "Mês atual",
        //Set the x-axis name
        xAxisName: "Naturezas",
        //Set the y-axis name
        yAxisName: "Quantidade",
        //captionOnTop: "0",
        //numberSuffix: "",
        //Set the theme for your chart
        theme: "gammel"
      },
      // Chart Data - from step 2
      data: this.chartDataNatureza
    };
  })
}

qtdAtendimentosSecretaria(mes: any, ano: any) {
  this.atendimentoService.qtdAtendimentosSecretaria(mes, ano).then(resultado => {
    this.chartDataSecretaria = resultado;
    this.barChartDataSecretaria = {
      labels: resultado.map(dado => dado.label),
        datasets: [
            {
              data: resultado.map(dado => dado.value),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                                '#DD4477', '#3366CC', '#DC3912'],
                                label: 'Secretaria'
            }
        ]
      }
  }).then(res => {
     // STEP 3 - Chart Configuration
    this.dataSourceSecretaria = {
      chart: {
        //Set the chart caption
        caption: "Top 5 Secretarias mais demandadas",
        //Set the chart subcaption
        subCaption: "Mês atual",
        //Set the x-axis name
        xAxisName: "Secretarias",
        //Set the y-axis name
        yAxisName: "Quantidade",
          //tooltipPosition: "top",
        //subCaptionFontBold: 1,
        //numberSuffix: "",
        //Set the theme for your chart
        theme: "gammel"
      },
         data: this.chartDataSecretaria
    };

  }).then(res => {
      this.loaderService.hide();
  })
}

}




