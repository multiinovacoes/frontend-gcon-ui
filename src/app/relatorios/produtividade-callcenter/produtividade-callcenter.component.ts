import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ExcelServiceService } from 'src/app/core/services/excel-service.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RelatorioFiltro, RelatorioService } from '../relatorio.service';

import * as moment from 'moment';
import Swal from "sweetalert2/dist/sweetalert2.js";
import { User } from 'src/app/core/models/user.model';
import { SessionService } from 'src/app/core/services/session.service';
import { UtilService } from 'src/app/util.service';
import { AreaService } from 'src/app/features/area/area.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';


@Component({
  selector: 'app-produtividade-callcenter',
  templateUrl: './produtividade-callcenter.component.html',
  styleUrls: ['./produtividade-callcenter.component.css']
})
export class ProdutividadeCallcenterComponent implements OnInit {

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
  nomeAtendente: string;
  data = new Date();
  user: User;
  chartData: any;
  areas!: any;
  descricaoArea!: string;
  todasAreas!: any;




 constructor(
   private relatorioService: RelatorioService,
   private routeStateService: RouteStateService,
   private errorHandler: ErrorHandlerService,
   private messageService: MessageService,
   private areaService: AreaService,
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
   this.tiposGrafico = this.utilService.listaTiposGrafico();
   this.carregarAreas();
   if (this.sessionService.getItem('filtro')) {
    this.filtro.dataInicial = new Date(this.sessionService.getItem('filtro').dataInicial);
    this.filtro.dataFinal = new Date(this.sessionService.getItem('filtro').dataFinal);
    this.dados = this.sessionService.getItem('resultado').lista;
    this.chartData = this.sessionService.getItem('resultado').lista;
    this.filtro.todasAreas = this.sessionService.getItem('filtro').todasAreas;
    this.filtro.area = this.sessionService.getItem('filtro').area;
    this.calculateTotal();
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
    this.filtro.dataInicial = new Date(moment(new Date(), "YYYY-MM-DD").startOf('month').toString());
    this.filtro.dataFinal = new Date(moment(new Date(), "YYYY-MM-DD").endOf('month').toString());
    this.filtro.area = 0
  }
  
 }

  ngOnDestroy() {
   this.loaderService.status.observers.forEach(function (element) {
     element.complete();
   });
 }

 carregarAreas() {
  this.areaService.listar()
    .then(areas => {
      this.areas = areas.
        map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
    })
    .catch(erro => this.errorHandler.handle(erro));
}


listarDetalhe(usuario: any, nomeAtendente: string) {
  this.filtro.usuario = usuario;
  this.filtro.nomeAtendente = nomeAtendente;
  this.sessionService.setItem('filtro', this.filtro);
  this.routeStateService.add('Lista Detalhe Produtividade Call Center',
  '/relatorio/produtividade-callcenter/lista-detalhe-callcenter', this.filtro, false);
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
      if (this.filtro.todasAreas === true){
        this.filtro.area = 0;
      }else{
        if (this.filtro.area === 0){
        Swal.fire(
          "Selecione a área",
          "",
          "warning"
        );
        return false;
        }
      }
      this.loaderService.show();
      this.relatorioService.pesquisarProdutividadeCallCenter(this.filtro)
     .then(resultado =>{
       if (resultado.length == 0){
         this.messageService.add({ severity: 'success', detail: 'Nenhuma manifestação encontrada!' });
       }else{
         this.dados = resultado.lista;
         this.sessionService.setItem('resultado', resultado);
         this.chartData = resultado.lista;
         this.descricaoArea = resultado.nome;
         this.calculateTotal();
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



}
