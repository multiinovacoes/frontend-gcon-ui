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
  selector: 'app-atendimento-priorizacao',
  templateUrl: './atendimento-priorizacao.component.html',
  styleUrls: ['./atendimento-priorizacao.component.css']
})
export class AtendimentoPriorizacaoComponent implements OnInit {

  filtro = new RelatorioFiltro();
  dados = [];
  showLoaderDialogRelatorio = false;
  width = "800";
  height = "300";
  type = "pie3d";
  dataFormat = "json";
  dataSource = {};
  tiposGrafico!: any;
  total!: number;
  data = new Date();
  user: User;
  chartData: any;




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
      this.loaderService.show();
      this.relatorioService.pesquisarPriorizacao(this.filtro)
     .then(data =>{
       if (data.length == 0){
         this.messageService.add({ severity: 'success', detail: 'Nenhuma manifestação encontrada!' });
       }else{
         this.dados = data;   
         this.calculateTotal();
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

 exportAsXLSX():void {
   this.excelService.exportAsExcelFile(this.dados, 'relatorio_natureza');
 }

calculateTotal() {
    let total = 0;
    for(let valor of this.dados) {
        total += valor.value;
    }

    this.total = total;
}

 qtdAtendimentos() {
  this.type = this.filtro.tipoGrafico;
  this.relatorioService.
  pesquisarPriorizacao(this.filtro).
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