import { Component, OnInit, ViewChild } from '@angular/core';

import * as moment from 'moment';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ExcelServiceService } from 'src/app/core/services/excel-service.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RelatorioFiltro, RelatorioService } from '../relatorio.service';

import { UtilService } from 'src/app/util.service';
import { User } from 'src/app/core/models/user.model';
import { SessionService } from 'src/app/core/services/session.service';

import Swal from "sweetalert2/dist/sweetalert2.js";
import { Table } from 'primeng/table';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { Paginacao } from './lista-detalhe/lista-detalhe.component';




@Component({
  selector: 'app-atendimento-natureza',
  templateUrl: './atendimento-natureza.component.html',
  styleUrls: ['./atendimento-natureza.component.css']
})
export class AtendimentoNaturezaComponent implements OnInit {

  filtro = new RelatorioFiltro();
  dados = [];
  buttonsImpressao = true;
  showLoaderDialogRelatorio = false;
  width = "800";
  height = "300";
  type = "pie3d";
  dataFormat = "json";
  chartDataNatureza: any;
  barChartData: any;
  dataSource = {};
  filtroPagina = new Paginacao();
  totalRegistros = 0;
  atendimentos = [];
  @ViewChild('tabela') grid: Table;
  ocultaGrafico = true;
  tiposGrafico!: any;
  displayModalPrint!: boolean;
  graficoNatureza!: string;
  total!: number;
  data = new Date();
  user: User;
  detalhe = true;




 constructor(
   private relatorioService: RelatorioService,
   private routeStateService: RouteStateService,
   private errorHandler: ErrorHandlerService,
   private messageService: MessageService,
   private sessionService: SessionService,
   private utilService: UtilService,
   private loaderService: LoaderService,
   private excelService: ExcelServiceService
 ) {
  this.barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Rejected',
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: 'Approved',
        backgroundColor: '#9CCC65',
        borderColor: '#7CB342',
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  }
  }

 ngOnInit(): void {
  this.detalhe = true;
  this.user = this.sessionService.getItem("currentUser");
 
   this.loaderService.status.subscribe((val: boolean) => {
     this.showLoaderDialogRelatorio = val;
   });
   if (this.sessionService.getItem('filtro')) {
    this.filtro.dataInicial = new Date(this.sessionService.getItem('filtro').dataInicial);
    this.filtro.dataFinal = new Date(this.sessionService.getItem('filtro').dataFinal);
    this.dados = this.sessionService.getItem('resultado');
    this.chartDataNatureza = this.sessionService.getItem('resultado');
    this.calculateTotal();
    this.dataSource = {
      chart: {
        formatNumber: "0",
        formatNumberScale: "0",
        xFormatNumberScale: "0",
        yFormatNumberScale: "0",
        theme: "gammel"
      },
      data: this.chartDataNatureza
    };
    this.sessionService.removeItem('filtro');
  } else {
    this.filtro.dataInicial = new Date(moment(new Date(), "YYYY-MM-DD").startOf('month').toString());
    this.filtro.dataFinal = new Date(moment(new Date(), "YYYY-MM-DD").endOf('month').toString());
  }
   this.buttonsImpressao = true;
   this.tiposGrafico = this.utilService.listaTiposGrafico();
 }

listarDetalhe(codigoNatureza: any) {
  this.filtro.natureza = codigoNatureza;
  this.filtro.area = 0;
  this.sessionService.setItem('filtro', this.filtro);
  this.routeStateService.add('Lista Detalhe de Natureza',
  '/relatorio/atendimento-natureza/lista-detalhe', this.filtro, false);
}

  ngOnDestroy() {
   this.loaderService.status.observers.forEach(function (element) {
     element.complete();
   });
 }

  pesquisa() {
    if (this.filtro.dataFinal.getTime() < this.filtro.dataInicial.getTime()){
      Swal.fire(
        "Período inválido",
        "A data final deve ser maior que a data inicial",
        "warning"
      );
      return false;
    }
      this.loaderService.show();
      this.relatorioService.pesquisarNatureza(this.filtro)
     .then(data =>{
       if (data.length == 0){
         this.messageService.add({ severity: 'success', detail: 'Nenhuma manifestação encontrada!' });
       }else{

        this.sessionService.setItem('resultado', data);
        this.chartDataNatureza = data;

         this.dados = data;   
         this.calculateTotal();
         this.buttonsImpressao = false;
       }
     }).then(res => {
      this.qtdAtendimentosNaturezas();
      this.calculateTotal();
      this.loaderService.hide();
     })
     .catch(erro => {
       this.loaderService.hide();
       this.errorHandler.handle(erro);
     });
 }

 exportAsXLSX():void {
   this.excelService.exportAsExcelFile(this.dados, 'relatorio_natureza');
 }

  print(){

    var conteudo = document.getElementById('print1').innerHTML;
    var telaImpressao = window.open('about:blank');
    alert(conteudo);
    
    telaImpressao.document.write(conteudo);
    telaImpressao.window.print();
    telaImpressao.window.close();

    //const printContent = document.getElementById("print1");
   //window.open('', '', 'left=0,top=50,width=900,height=900,toolbar=0,scrollbars=0,status=0');
   //window.document.write(printContent.innerHTML);
    //WindowPrt.document.close();
    //WindowPrt.focus();
    //WindowPrt.print();
    //WindowPrt.close();
   //window.print();
   //return false;
  }



calculateTotal() {
    let total = 0;
    for(let valor of this.dados) {
        total += valor.value;
    }

    this.total = total;
}
  



  grafico(){
    this.relatorioService.
    pesquisarGraficoNatureza(this.filtro).
        then(resultado => {
          this.graficoNatureza = resultado;
    })
    
  }

 qtdAtendimentosNaturezas() {
  this.type = this.filtro.tipoGrafico;
  this.relatorioService.
    pesquisarNatureza(this.filtro).
      then(resultado => {
        this.chartDataNatureza = resultado;

    }).then(res => {
    // STEP 3 - Chart Configuration
    this.dataSource = {
      chart: {
        //Set the chart caption
        //caption: "Atendimentos por Natureza",
        //Set the chart subcaption
        //subCaption: "Mês atual",
        //Set the x-axis name
        //xAxisName: "Naturezas",
        //Set the y-axis name
        //yAxisName: "Quantidade",
        formatNumber: "0",
        formatNumberScale: "0",
        xFormatNumberScale: "0",
        yFormatNumberScale : "0",
        theme: "gammel"
      },
      data: this.chartDataNatureza
    };
  })
}


}



