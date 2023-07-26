import { Component, OnInit } from '@angular/core';
import { RelatorioFiltro, RelatorioService } from '../relatorio.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { EncaminhamentoService } from 'src/app/features/atendimento/encaminhamento/encaminhamento.service';
import { SessionService } from 'src/app/core/services/session.service';
import { MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UtilService } from 'src/app/util.service';
import { ExcelServiceService } from 'src/app/core/services/excel-service.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';

import * as moment from 'moment';
import Swal from "sweetalert2/dist/sweetalert2.js";
import { SetorService } from 'src/app/features/setor/setor.service';


@Component({
  selector: 'app-encaminhamento-setor',
  templateUrl: './encaminhamento-setor.component.html',
  styleUrls: ['./encaminhamento-setor.component.css']
})
export class EncaminhamentoSetorComponent implements OnInit {

   filtro = new RelatorioFiltro();
   atendimentoSetor = [];
   rowGroupMetadata: any;
   areas!: any;
   statuss = [];
   buttonsImpressao = true;
   showLoaderDialogRelatorio = false;


  constructor(
    private relatorioService: RelatorioService,
    private errorHandler: ErrorHandlerService,
    private setorService: SetorService,
    private encaminhamentoSetorService: EncaminhamentoService,
    private sessionService: SessionService,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private utilService: UtilService,
    private excelService: ExcelServiceService,
    private routeStateService: RouteStateService
  ) { }

  ngOnInit(): void {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoaderDialogRelatorio = val;
    });
    this.buttonsImpressao = true;
    this.carregarAreas();
    this.statuss = this.utilService.listaStatusEncaminhamento();
  if (this.sessionService.getItem('filtro')) {
    this.filtro.dataInicial = new Date(this.sessionService.getItem('filtro').dataInicial);
    this.filtro.dataFinal = new Date(this.sessionService.getItem('filtro').dataFinal);
    this.filtro.status = this.sessionService.getItem('filtro').status;
    this.filtro.area = this.sessionService.getItem('filtro').area;
    this.atendimentoSetor = this.sessionService.getItem('rel_setor');
    this.updateRowGroupMetaData();
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
       this.relatorioService.pesquisarEncaminhamento(this.filtro)
      .then(data =>{
        if (data.length == 0){
          this.messageService.add({ severity: 'success', detail: 'Nenhuma encaminhamento encontrado!' });
          this.atendimentoSetor = [];
        }else{
          this.atendimentoSetor = data;
          console.log(data);
          this.updateRowGroupMetaData();
          this.buttonsImpressao = false;
          this.sessionService.setItem('rel_setor', data);
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
        .encaminhamentoSetorPDF(this.filtro)
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
    this.excelService.exportAsExcelFile(this.atendimentoSetor, 'relatorio_area');
  }

    carregarAreas() {
    this.setorService.listar()
      .then(areas => {
        this.areas = areas.
          map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  showAtendimento(idAtendimento: number){
    this.sessionService.setItem('filtro', this.filtro);
    this.routeStateService.add('Edição de Atendimento',
      '/main/atendimento/atendimento-cadastro', idAtendimento, false);
  }

     updateRowGroupMetaData() {
        this.rowGroupMetadata = {};
        let index = 0;
        if (this.atendimentoSetor) {
            for (let i = 0; i < this.atendimentoSetor.length; i++) {
                let rowData = this.atendimentoSetor[i];
                let representativeName = rowData.area;
                
                if (i == 0) {
                    this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
                }
                else {
                    
                    let previousRowData = this.atendimentoSetor[i - 1];
                    let previousRowGroup = previousRowData.area;
                    if (representativeName == previousRowGroup){
                        this.rowGroupMetadata[representativeName].size++;
                    }else{
                        this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                    }
                }
            }
        }
    }




    calculateCustomerTotal(name) {
      let total = 0;

      if (this.atendimentoSetor) {
          for (let atendimento of this.atendimentoSetor) {
              if (atendimento.area === name) {
                  total++;
              }
          }
      }

      return total;
  }


}
