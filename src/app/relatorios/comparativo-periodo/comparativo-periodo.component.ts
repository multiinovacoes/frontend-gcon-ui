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
  selector: 'app-comparativo-periodo',
  templateUrl: './comparativo-periodo.component.html',
  styleUrls: ['./comparativo-periodo.component.css']
})
export class ComparativoPeriodoComponent implements OnInit {

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
  dataSourcePeriodo1 = {};
  dataSourcePeriodo2 = {};
  tiposGrafico!: any;
  data = new Date();
  user: User;
  chartData: any;
  chartDataPeriodo1: any;
  chartDataPeriodo2: any;

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
   this.filtro.dataInicialAnterior = new Date(moment(new Date(), "YYYY-MM-DD").startOf('month').toString());
   this.filtro.dataFinalAnterior = new Date(moment(new Date(), "YYYY-MM-DD").endOf('month').toString());
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
        "Período 1 inválido",
        "A data final deve ser maior que a data inicial",
        "warning"
      );
      return false;
    }

    if (this.filtro.dataFinalAnterior.getTime() < this.filtro.dataInicialAnterior.getTime()){
      Swal.fire(
        "Período 2 inválido",
        "A data final deve ser maior que a data inicial",
        "warning"
      );
      return false;
    }

      this.type = this.filtro.tipoGrafico;
      this.loaderService.show();
      this.relatorioService.pesquisarComparativoPeriodo(this.filtro)
     .then(resultado =>{
       if (resultado.length == 0){
         this.messageService.add({ severity: 'success', detail: 'Nenhuma manifestação encontrada!' });
       }else{
      this.dados= resultado;
      this.chartData = resultado.listaManifestacoes;
      this.chartDataPeriodo1 = resultado.listaNaturezaPeriodo1;
      this.chartDataPeriodo2 = resultado.listaNaturezaPeriodo2;
       }
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
        this.dataSourcePeriodo1 = {
          chart: {
            formatNumber: "0",
            formatNumberScale: "0",
            xFormatNumberScale: "0",
            yFormatNumberScale : "0",
            theme: "gammel"
          },
          data: this.chartDataPeriodo1
        };
        this.dataSourcePeriodo2 = {
          chart: {
            formatNumber: "0",
            formatNumberScale: "0",
            xFormatNumberScale: "0",
            yFormatNumberScale : "0",
            theme: "gammel"
          },
          data: this.chartDataPeriodo2
        };
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


}