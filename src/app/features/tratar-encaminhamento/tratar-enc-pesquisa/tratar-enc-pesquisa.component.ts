import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ExcelServiceService } from 'src/app/core/services/excel-service.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { MessageService } from 'primeng/api';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { SessionService } from 'src/app/core/services/session.service';
import { EncaminhamentoService } from '../../atendimento/encaminhamento/encaminhamento.service';
import { UtilService } from 'src/app/util.service';



@Component({
  selector: 'app-tratar-enc-pesquisa',
  templateUrl: './tratar-enc-pesquisa.component.html',
  styleUrls: ['./tratar-enc-pesquisa.component.css']
})
export class TratarEncPesquisaComponent implements OnInit {

  dados = [];
  showLoaderDialogTratar = false;
  anexos!: any;
  ano = 0;
  anos = [];


  constructor(
    private errorHandler: ErrorHandlerService,
    private encaminhamentoService: EncaminhamentoService,
    private messageService: MessageService,
    private sessionService: SessionService,
    private routeStateService: RouteStateService,
    private utilService: UtilService,
    private loaderService: LoaderService,
    private excelService: ExcelServiceService
  ) { }

  ngOnInit(): void {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoaderDialogTratar = val;
    });
    this.ano = 2023;
    this.listaTratar();
    this.anos = this.utilService.listaAnos();
  }


  listaTratar(){
    this.loaderService.show();
    this.encaminhamentoService.listarEncaminhamentoTratar(this.ano)
   .then(data =>{
     if (data.length == 0){
       this.messageService.add({ severity: 'success', detail: 'Nenhum encaminhamento encontrado!' });
       this.dados = [];
     }else{
       this.dados = data;
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



  ngOnDestroy() {
    this.loaderService.status.observers.forEach(function (element) {
      element.complete();
    });
  }

  showAtendimento(idAtendimento: number){
    this.routeStateService.add('Edição de Atendimento',
      '/main/tratar-encaminhamento/tratar-enc-cadastro', idAtendimento, false);
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.dados, 'relatorio_interlocutor');
  }


}
