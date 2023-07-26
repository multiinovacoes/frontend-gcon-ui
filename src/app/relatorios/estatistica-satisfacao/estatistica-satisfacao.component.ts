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
import { AreaService } from 'src/app/features/area/area.service';


@Component({
  selector: 'app-estatistica-satisfacao',
  templateUrl: './estatistica-satisfacao.component.html',
  styleUrls: ['./estatistica-satisfacao.component.css']
})
export class EstatisticaSatisfacaoComponent implements OnInit {

  filtro = new RelatorioFiltro();
  dados = [];
  dadosMeiosComunicacaoPesq = [];
  showLoaderDialogRelatorio = false;
  width = "800";
  height = "300";
  type = "pie3d";
  dataFormat = "json";
  dataSource = {};
  dataSourceMeiosComunicacaoPesq = {};
  tiposGrafico!: any;
  total!: number;
  data = new Date();
  user: User;
  chartData: any;
  chartDataMeiosComunicacaoPesq: any;
  perguntas: any;
  qtdManifestacoes: number;
  qtdManifestacoesConcluidas: number;
  qtdPesquisasRespondidas: number;
  areas!: any;
  descricaoArea!: string;


  constructor(
    private relatorioService: RelatorioService,
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
    this.filtro.dataInicial = new Date(moment(new Date(), "YYYY-MM-DD").startOf('month').toString());
    this.filtro.dataFinal = new Date(moment(new Date(), "YYYY-MM-DD").endOf('month').toString());
    this.tiposGrafico = this.utilService.listaTiposGrafico();
    this.carregarAreas();
    this.filtro.area = 0;
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

  pesquisa() {
    if (this.filtro.dataFinal.getTime() < this.filtro.dataInicial.getTime()){ 
      Swal.fire(
        "Período inválido",
        "A data final deve ser maior que a data inicial",
        "warning"
      );
      return false;
    }
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
      this.relatorioService.pesquisarEstatisticaSatisfacao(this.filtro)
     .then(data =>{
       if (data.length == 0){
         this.messageService.add({ severity: 'success', detail: 'Nenhuma manifestação encontrada!' });
       }else{
         this.dados = data.listaDadosTipoManifestante;   
         this.dadosMeiosComunicacaoPesq = data.listaTiposRespostasPesquisa;   
         this.perguntas = data.listaEstatistica;
         this.qtdManifestacoes = data.qtdManifestacoes;
         this.qtdManifestacoesConcluidas = data.qtdManifestacoesConcluidas;
         this.qtdPesquisasRespondidas = data.qtdPesquisaSatisfacaoRespondida;
         this.descricaoArea = data.area;

         this.chartData = data.listaDadosTipoManifestante;
         this.chartDataMeiosComunicacaoPesq = data.listaTiposRespostasPesquisa;

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

        this.dataSourceMeiosComunicacaoPesq = {
          chart: {
            formatNumber: "0",
            formatNumberScale: "0",
            xFormatNumberScale: "0",
            yFormatNumberScale : "0",
            theme: "gammel"
          },
          data: this.chartDataMeiosComunicacaoPesq
        };       

         for(var i = 0; i < this.perguntas.length; i++){

          this.chartData = this.perguntas[i].dados;

          this.perguntas[i].dataSource = {
            chart: {
              formatNumber: "0",
              formatNumberScale: "0",
              xFormatNumberScale: "0",
              yFormatNumberScale : "0",
              theme: "gammel"
            },
            data: this.chartData
          };

         }

       }
     }).then(res => {
      //this.qtdAtendimentos();
   
      this.loaderService.hide();
     })
     .catch(erro => {
       this.loaderService.hide();
       this.errorHandler.handle(erro);
     });
 }


  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.dados, 'relatorio_estatistica');
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
    pesquisarEstatisticaSatisfacao(this.filtro).
        then(resultado => {
          this.chartData = resultado.listaDadosTipoManifestante;
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
