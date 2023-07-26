import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ExcelServiceService } from 'src/app/core/services/excel-service.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { RelatorioFiltro, RelatorioService } from '../relatorio.service';

import * as moment from 'moment';

import Swal from "sweetalert2/dist/sweetalert2.js";
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-atendimento-periodo',
  templateUrl: './atendimento-periodo.component.html',
  styleUrls: ['./atendimento-periodo.component.css']
})
export class AtendimentoPeriodoComponent implements OnInit {

  filtro = new RelatorioFiltro();
  atendimentoPeriodo = [];
  rowGroupMetadata: any;
  buttonsImpressao = true;
  showLoaderDialogRelatorio = false;


 constructor(
   private relatorioService: RelatorioService,
   private errorHandler: ErrorHandlerService,
   private messageService: MessageService,
   private sessionService: SessionService,
   private loaderService: LoaderService,
   private excelService: ExcelServiceService,
   private routeStateService: RouteStateService
 ) { }

 ngOnInit(): void {
   this.loaderService.status.subscribe((val: boolean) => {
     this.showLoaderDialogRelatorio = val;
   });
   this.buttonsImpressao = true;
   if (this.sessionService.getItem('filtro')) {
    this.filtro.dataInicial = new Date(this.sessionService.getItem('filtro').dataInicial);
    this.filtro.dataFinal = new Date(this.sessionService.getItem('filtro').dataFinal);
    this.atendimentoPeriodo = this.sessionService.getItem('rel_periodo');
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
      this.relatorioService.pesquisarPeriodo(this.filtro)
     .then(data =>{
       if (data.length == 0){
         this.messageService.add({ severity: 'success', detail: 'Nenhuma manifestação encontrada!' });
       }else{
         this.atendimentoPeriodo = data;
         this.buttonsImpressao = false;
         this.sessionService.setItem('rel_periodo', this.atendimentoPeriodo);
       }
     }
     ).then(res => {
         this.loaderService.hide();
     })
     .catch(erro => {
       this.loaderService.hide();
       this.errorHandler.handle(erro);
     });
 }


 showPDF(){
       this.loaderService.show();
       this.relatorioService
       .atendimentoPeriodo(this.filtro)
       .then((response) => {
         const file = new Blob([response], { type: response.type });
         var url = URL.createObjectURL(file);
         this.loaderService.hide();
         window.open(url);
       })
       .catch((erro) => {
         this.loaderService.hide();
         this.errorHandler.handle(erro);
       });
 }


 exportAsXLSX():void {
   this.excelService.exportAsExcelFile(this.atendimentoPeriodo, 'relatorio_periodo');
 }


 showAtendimento(idAtendimento: number){
  this.sessionService.setItem('filtro', this.filtro);
   this.routeStateService.add('Edição de Atendimento',
     '/main/atendimento/atendimento-cadastro', idAtendimento, false);
 }

}
