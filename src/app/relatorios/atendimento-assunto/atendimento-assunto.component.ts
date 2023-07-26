import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ExcelServiceService } from 'src/app/core/services/excel-service.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UtilService } from 'src/app/util.service';
import { RelatorioFiltro, RelatorioService } from '../relatorio.service';

import * as moment from 'moment';
import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/core/models/user.model';
import Swal from "sweetalert2/dist/sweetalert2.js";
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { AssuntoService } from 'src/app/features/assunto/assunto.service';

@Component({
  selector: 'app-atendimento-assunto',
  templateUrl: './atendimento-assunto.component.html',
  styleUrls: ['./atendimento-assunto.component.css']
})
export class AtendimentoAssuntoComponent implements OnInit {

  filtro = new RelatorioFiltro();
  dados = [];
  buttonsImpressao = true;
  showLoaderDialogRelatorio = false;
  width = "800";
  height = "300";
  assuntos!: any;
  type = "pie3d";
  dataFormat = "json";
  chartData: any;
  barChartData: any;
  dataSource = {};
  ocultaGrafico = true;
  tiposGrafico!: any;
  displayModalPrint!: boolean;
  graficoNatureza!: string;
  total!: number;
  data = new Date();
  user: User;



 constructor(
   private relatorioService: RelatorioService,
   private errorHandler: ErrorHandlerService,
   private messageService: MessageService,
   private assuntoService: AssuntoService,
   private routeStateService: RouteStateService,
   private sessionService: SessionService,
   private utilService: UtilService,
   private loaderService: LoaderService,
   private excelService: ExcelServiceService
 ) {
  }

 ngOnInit(): void {
  this.user = this.sessionService.getItem("currentUser");
   this.loaderService.status.subscribe((val: boolean) => {
     this.showLoaderDialogRelatorio = val;
   });
   this.carregarAssuntos();
   this.buttonsImpressao = true;
   if (this.sessionService.getItem('filtro')) {
    this.filtro.dataInicial = new Date(this.sessionService.getItem('filtro').dataInicial);
    this.filtro.dataFinal = new Date(this.sessionService.getItem('filtro').dataFinal);
    this.dados = this.sessionService.getItem('resultado');
    this.chartData = this.sessionService.getItem('resultado');
    this.filtro.assunto = this.sessionService.getItem('filtro').assunto;
    this.dataSource = {
      chart: {
        formatNumber: "0",
        formatNumberScale: "0",
        xFormatNumberScale: "0",
        yFormatNumberScale: "0",
        theme: "gammel"
      },
      data: this.chartData
    };
  
  } else {
    this.filtro.assunto = 'NÃO CLASSIFICADO';
    this.filtro.dataInicial = new Date(moment(new Date(), "YYYY-MM-DD").startOf('month').toString());
    this.filtro.dataFinal = new Date(moment(new Date(), "YYYY-MM-DD").endOf('month').toString());
  }
  this.tiposGrafico = this.utilService.listaTiposGrafico();
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
      this.relatorioService.pesquisarAssunto(this.filtro)
     .then(data =>{
       if (data.length == 0){
         this.messageService.add({ severity: 'success', detail: 'Nenhuma manifestação encontrada!' });
       }else{
         this.dados = data;  
         document.getElementById('yesprint').style.display = 'none';
         this.buttonsImpressao = false;
         this.sessionService.setItem('resultado', data);
       }
     }).then(res => {
      this.qtdAtendimentos();
      this.calculateTotal();
      this.loaderService.hide();
     })
     .catch(erro => {
       this.loaderService.hide();
       this.errorHandler.handle(erro);
     });
 }

 carregarAssuntos() {
  this.assuntoService.listar()
    .then(assuntos => {
      this.assuntos = assuntos.
        map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.descricao }));
    })
    .catch(erro => this.errorHandler.handle(erro));
}

 listarDetalheAssunto(label: any) {
  this.filtro.assunto = label;
  this.sessionService.setItem('filtro', this.filtro);
  this.routeStateService.add('Lista de Detalhe Por Assunto',
    '/relatorio/atendimento-assunto/lista-detalhe-assunto', this.filtro, false);
}


 exportAsXLSX():void {
   this.excelService.exportAsExcelFile(this.dados, 'relatorio_natureza');
 }

 imprimir1(){
  //var conteudo = document.getElementById('demo1').innerHTML;
   //window.document.body.innerHTML = conteudo;
  //window.print();

  let printData = document.getElementById('demo1').cloneNode(true);
  document.body.appendChild(printData);
  window.print();
  document.body.removeChild(printData);
  }



  imprimir(){

    var conteudo = document.getElementById('demo').innerHTML;
    var oldstr = document.body.innerHTML;
    document.body.innerHTML = conteudo;

    //let telaImpressao = window.open('about:blank');
    //let printData = document.getElementById('demo');//.cloneNode(false);
  //document.body.append(printData);
  window.open('about:blank');
  window.print();
  document.body.innerHTML = oldstr;
  //document.body.removeChild(printData);
    //window.document.body.innerHTML = conteudo;
    //telaImpressao.document.write(window.document.body.innerHTML);
    //this.displayModalPrint = true;
    //window.print();
    return false;
    }

  calculateTotal() {
    let total = 0;
    for(let valor of this.dados) {
        total += valor.value;
    }

    this.total = total;
}

  onClosePrint(){
    this.displayModalPrint = false;
  }


 qtdAtendimentos() {
  this.type = this.filtro.tipoGrafico;
  this.relatorioService.
    pesquisarAssunto(this.filtro).
      then(resultado => {
        this.chartData = resultado;

    }).then(res => {
    this.dataSource = {
      chart: {
        formatNumber: "0",
        formatNumberScale: "0",
        xFormatNumberScale: "0",
        yFormatNumberScale : "0",
        theme: "gammel"
      },
      data: this.chartData
    };
  })
}

}
