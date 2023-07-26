import { Component, OnInit } from '@angular/core';

import { ChartOptions } from 'chart.js';
import { UserDataService } from '../seguranca/user-data.service';

import * as moment from 'moment'
import { LoaderService } from 'src/app/core/services/loader.service';
import { Title } from '@angular/platform-browser';
import { AtendimentoService } from '../atendimento/atendimento.service';
import { EncaminhamentoService } from '../atendimento/encaminhamento/encaminhamento.service';
import { UtilService } from 'src/app/util.service';


@Component({
  selector: 'app-dashboard-gerencial',
  templateUrl: './dashboard-gerencial.component.html',
  styleUrls: ['./dashboard-gerencial.component.css']
})
export class DashboardGerencialComponent implements OnInit {

  barChartData: any;

  barChartDataSecretaria: any;

  barChartDataSecretariaVencida: any;

  barChartDataSecretariaEnviada: any;

  qtdNovosAtendimentos: number;

  qtdEncaminhamentosRecebidos: number;

  qtdEncaminhamentosVencidos: number;

  qtdEncaminhamentosNaoVencidos: number;

  qtdAtendimentosMesNaoVencido: number;

  qtdAtendimentosMesVencido: number;

  qtdAtendimentosMes: number;

  qtdAtendimentosMesConcluidos: number;

  dataSourceSecretaria = {};

  dataSourceSecretariaVencida = {};

  dataSourceSecretariaEnviada = {};

  dataSourceNatureza = {};

  chartDataSecretaria: any;

  chartDataSecretariaVencida: any;

  chartDataSecretariaEnviada: any;

  chartDataNatureza: any;

  showLoaderDialogDashboard = false;

  mesAtual: any;

  width = "100%";
  height = "300";

  permissoes!: any;

  meses  = [];
  anos  = [];

  ano: any;
  mes: any;

  
  descricaoMeses(numero: number): String{
    if (numero === 1)
      return 'JANEIRO';
    else if (numero === 2)
      return 'FEVEREIRO';
    else if (numero === 3)
      return 'MARÇO';
    else if (numero === 4)
      return 'ABRIL';
    else if (numero === 5)
      return 'MAIO';
    else if (numero === 6)
      return 'JUNHO';
    else if (numero === 7)
      return 'JULHO';
    else if (numero === 8)
      return 'AGOSTO';
    else if (numero === 9)
      return 'SETEMBRO';
    else if (numero === 10)
      return 'OUTUBRO';
    else if (numero === 11)
      return 'NOVEMBRO';
    else if (numero === 12)
      return 'DEZEMBRO';
  }


  constructor(
    private loaderService: LoaderService,
     private title: Title,
     private userDataService: UserDataService,
     private utilitariaService: UtilService,
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
      this.title.setTitle('Dashboard Gerencial');
      const data = moment();
      this.mes = data.month()+1;
      this.ano = data.year();
      this.loaderService.show();
      this.meses = this.utilitariaService.listaMeses();
      this.anos = this.utilitariaService.listaAnos();
      this.mesAtual = this.descricaoMeses(this.mes);
      this.consultar();
  }

  consultar(){
    this.loaderService.show();
    this.mesAtual = this.descricaoMeses(this.mes);
    this.atendimentosVencidos();
    this.qtdAtendimentosMesAno();
    this.atendimentosNaoVencidos();
    this.encaminhamentosNaoVencidos();
    this.qtdAtendimentosNaturezas();
    this.qtdAtendimentosSecretaria();
    this.qtdAtendimentosSecretariaVencida();
    this.qtdAtendimentosSecretariaEnviada();
    this.encaminhamentosVencidos();
  }


    novosAtendimentos() {
    this.atendimentoService.
     novosAtendimentos().
       then(resultado => {
         this.qtdNovosAtendimentos = resultado;
       })
    }

    


    atendimentosVencidos() {
      this.atendimentoService.
      atendimentosVencidos(this.mes, this.ano).
         then(resultado => {
           this.qtdAtendimentosMesVencido = resultado;
         })
      }

      atendimentosNaoVencidos() {
        this.atendimentoService.
        atendimentosNaoVencidos(this.mes, this.ano).
           then(resultado => {
             this.qtdAtendimentosMesNaoVencido = resultado;
           })
        }

    qtdAtendimentosMesAno() {
    this.atendimentoService.
     qtdAtendimentosMes(this.mes, this.ano).
       then(resultado => {
         this.qtdAtendimentosMes = resultado;
       })
    }



    encaminhamentosVencidos() {
      this.encaminhamentoService.
      encaminhamentosVencidos(this.mes, this.ano).
         then(resultado => {
           this.qtdEncaminhamentosVencidos = resultado;
          }).then(res => {
            this.loaderService.hide();
         })
      }

      encaminhamentosNaoVencidos() {
        this.encaminhamentoService.
        encaminhamentosNaoVencidos(this.mes, this.ano).
           then(resultado => {
             this.qtdEncaminhamentosNaoVencidos = resultado;
          })
      }      



  qtdAtendimentosNaturezas() {
    this.atendimentoService.
    qtdAtendimentosNaturezaDashboard(this.mes, this.ano).
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

qtdAtendimentosSecretaria() {
  this.atendimentoService.qtdAtendimentosSecretaria(this.mes, this.ano).then(resultado => {
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

 
  })
}


qtdAtendimentosSecretariaVencida() {
  this.encaminhamentoService.qtdEncaminhamentoSecretariaVencido(this.mes, this.ano).then(resultado => {
    this.chartDataSecretariaVencida = resultado;
    this.barChartDataSecretariaVencida = {
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
    this.dataSourceSecretariaVencida = {
      chart: {
        //Set the chart caption
        caption: "Top 5 Secretarias mais Atrasadas",
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
         data: this.chartDataSecretariaVencida
    };

 
  })
}


qtdAtendimentosSecretariaEnviada() {
  this.encaminhamentoService.qtdEncaminhamentoSecretariaEnviada(this.mes, this.ano).then(resultado => {
    this.chartDataSecretariaEnviada = resultado;
    this.barChartDataSecretariaEnviada = {
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
    this.dataSourceSecretariaEnviada = {
      chart: {
        //Set the chart caption
        caption: "Top 5 Secretarias mais Tramitadas",
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
         data: this.chartDataSecretariaEnviada
    };

 
  })
}


}
