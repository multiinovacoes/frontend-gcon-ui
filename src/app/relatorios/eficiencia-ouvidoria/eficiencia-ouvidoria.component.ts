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

import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: 'app-eficiencia-ouvidoria',
  templateUrl: './eficiencia-ouvidoria.component.html',
  styleUrls: ['./eficiencia-ouvidoria.component.css']
})
export class EficienciaOuvidoriaComponent implements OnInit {

  filtro = new RelatorioFiltro();
  atendimentoArea = [];
  areas!: any;
  dados = [];
  showLoaderDialogRelatorio = false;
  width = "800";
  height = "400";
  type = "pie3d";
  dataFormat = "json";
  dataSource = {};
  tiposGrafico!: any;
  data = new Date();
  dadosResolutividade = [];
  dadosNatureza = [];
  dadosPriorizacao = [];
  dadosAssunto = [];
  dadosArea = [];
  user: User;
  dataSourceResolutividade = {};
  dataSourceNatureza = {};
  dataSourcePriorizacao = {};
  dataSourceAssunto = {};
  dataSourceArea = {};
  totalNatureza = 0;
  totalPriorizacao = 0;
  totalArea = 0;
  totalResolutividade = 0;
  totalAssunto = 0;

 constructor(
   private relatorioService: RelatorioService,
   private errorHandler: ErrorHandlerService,
   private messageService: MessageService,
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
   this.filtro.dataInicial = new Date(moment(new Date(), "YYYY-MM-DD").startOf('month').toString());
   this.filtro.dataFinal = new Date(moment(new Date(), "YYYY-MM-DD").endOf('month').toString());
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
      this.type = this.filtro.tipoGrafico;
      this.loaderService.show();
      this.relatorioService.pesquisarEficienciaOuvidoria(this.filtro)
     .then(resultado =>{
       if (resultado.length == 0){
         this.messageService.add({ severity: 'success', detail: 'Nenhuma manifestação encontrada!' });
       }else{


        this.dataSource = {
          chart: {
            formatNumber: "0",
            formatNumberScale: "0",
            xFormatNumberScale: "0",
            yFormatNumberScale : "0",
            theme: "gammel"
          },
          data: resultado.lista
        };
        this.dataSourceResolutividade = {
          chart: {
            formatNumber: "0",
            formatNumberScale: "0",
            xFormatNumberScale: "0",
            yFormatNumberScale: "0",
            theme: "gammel"
          },
          data: resultado.listaResolutividade
        };
        this.dataSourceNatureza = {
          chart: {
            formatNumber: "0",
            formatNumberScale: "0",
            xFormatNumberScale: "0",
            yFormatNumberScale: "0",
            theme: "gammel"
          },
          data: resultado.listaNatureza
        };
        this.dataSourcePriorizacao = {
          chart: {
            formatNumber: "0",
            formatNumberScale: "0",
            xFormatNumberScale: "0",
            yFormatNumberScale: "0",
            theme: "gammel"
          },
          data: resultado.listaPriorizacao
        };   
        
        this.dataSourceArea = {
          chart: {
            formatNumber: "0",
            formatNumberScale: "0",
            xFormatNumberScale: "0",
            yFormatNumberScale : "0",
            theme: "gammel"
          },
          data: resultado.listaArea
        };    
        
        this.dataSourceAssunto = {
          chart: {
            formatNumber: "0",
            formatNumberScale: "0",
            xFormatNumberScale: "0",
            yFormatNumberScale: "0",
            theme: "gammel"
          },
          data: resultado.listaAssunto
        };        


      this.dados= resultado.lista;
      this.dadosResolutividade = resultado.listaResolutividade;
      this.dadosNatureza = resultado.listaNatureza;
      this.dadosPriorizacao = resultado.listaPriorizacao;
      this.dadosArea = resultado.listaArea;
      this.dadosAssunto = resultado.listaAssunto;

       }
      }).then(res => {
        this.calculateTotalNatureza();
        this.calculateTotalPriorizacao();
        this.calculateTotalArea();
        this.calculateTotalResolutividade();
        this.calculateTotalAssunto();
       })       
     .then(() => {
      this.loaderService.hide();
     })
     .catch(erro => {
       this.loaderService.hide();
       this.errorHandler.handle(erro);
     });
 }

 exportAsXLSX():void {
   this.excelService.exportAsExcelFile(this.dados, 'eficiencia_ouvidoria');
 }

 calculateTotalNatureza() {
  let totalNatureza = 0;
  for (let valor of this.dadosNatureza) {
    totalNatureza += valor.value;
  }
  this.totalNatureza = totalNatureza;
}

calculateTotalPriorizacao() {
  let totalPriorizacao = 0;
  for (let valor of this.dadosPriorizacao) {
    totalPriorizacao += valor.value;
  }
  this.totalPriorizacao = totalPriorizacao;
}

calculateTotalArea() {
  let totalArea = 0;
  for (let valor of this.dadosArea) {
    totalArea += valor.value;
  }
  this.totalArea = totalArea;
}

calculateTotalResolutividade() {
  let totalResolutividade = 0;
  for (let valor of this.dadosResolutividade) {
    totalResolutividade += valor.value;
  }
  this.totalResolutividade = totalResolutividade;
}

calculateTotalAssunto() {
  let totalAssunto = 0;
  for (let valor of this.dadosAssunto) {
    totalAssunto += valor.value;
  }
  this.totalAssunto = totalAssunto;
}

}
