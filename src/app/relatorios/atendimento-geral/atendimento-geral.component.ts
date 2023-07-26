import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { MessageService } from 'primeng/api';
import { ExcelServiceService } from 'src/app/core/services/excel-service.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { RelatorioFiltro, RelatorioService } from '../relatorio.service';

import * as moment from 'moment';

import Swal from "sweetalert2/dist/sweetalert2.js";
import { TipoExpressaoService } from 'src/app/features/tipo-expressao/tipo-expressao.service';
import { RelatorioGeral } from 'src/app/core/models/relatorio-geral.model';
import { SessionService } from 'src/app/core/services/session.service';


@Component({
  selector: 'app-atendimento-geral',
  templateUrl: './atendimento-geral.component.html',
  styleUrls: ['./atendimento-geral.component.css']
})
export class AtendimentoGeralComponent implements OnInit {

  filtro = new RelatorioFiltro();
  atendimentoPeriodo = [];
  rowGroupMetadata: any;
  buttonsImpressao = true;
  showLoaderDialogRelatorio = false;
  selectedCampos: any;
  campos: any[];
  relatorioGeral = new RelatorioGeral();
  colunas: [];



 constructor(
   private relatorioService: RelatorioService,
   private tipoExpressaoService: TipoExpressaoService,
   private errorHandler: ErrorHandlerService,
   private sessionService: SessionService,
   private messageService: MessageService,
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
    this.selectedCampos = this.sessionService.getItem('selectedCampos');
    this.colunas = this.sessionService.getItem('colunas');
    this.atendimentoPeriodo = this.sessionService.getItem('rel_geral');
    this.sessionService.removeItem('filtro');
  } else {
    this.filtro.dataInicial = new Date(moment(new Date(), "YYYY-MM-DD").startOf('month').toString());
    this.filtro.dataFinal = new Date(moment(new Date(), "YYYY-MM-DD").endOf('month').toString());
  }
   this.carregarTipoExpressao();
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

    if (this.selectedCampos.length > 9){
      Swal.fire(
        "Quantidade de campos não permitida",
        "É permitido apenas a seleção de 9 campos",
        "warning"
      );
      return false;
    }
      this.loaderService.show();
      this.relatorioGeral.dataInicial = this.filtro.dataInicial;
      this.relatorioGeral.dataFinal = this.filtro.dataFinal;

      this.relatorioGeral.camposTipoExpressao = this.selectedCampos;

      this.relatorioService.pesquisarGeral(this.relatorioGeral)
     .then(data =>{
       if (data.length == 0){
         this.messageService.add({ severity: 'success', detail: 'Nenhuma manifestação encontrada!' });
       }else{
        
         this.atendimentoPeriodo = data.atendimentos;
         this.colunas = data.colunas;
         this.buttonsImpressao = false;
         this.sessionService.setItem('rel_geral', this.atendimentoPeriodo);
         this.sessionService.setItem('selectedCampos', this.selectedCampos);
         this.sessionService.setItem('colunas', this.colunas);
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
   this.excelService.exportAsExcelFile(this.atendimentoPeriodo, 'relatorio_geral');
 }


 showAtendimento(idAtendimento: number){
  this.sessionService.setItem('filtro', this.filtro);
   this.routeStateService.add('Edição de Atendimento',
     '/main/atendimento/atendimento-cadastro', idAtendimento, false);
 }

 carregarTipoExpressao() {
  this.tipoExpressaoService
    .listar()
    .then((campo) => {
      this.campos = campo.map(
        (o: { descricao: any; campo: any }) => ({
          label: o.descricao,
          value: o.campo,
        })
      );
    })
    .catch((erro) => this.errorHandler.handle(erro));
}

}
