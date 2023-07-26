import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ExcelServiceService } from 'src/app/core/services/excel-service.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RelatorioFiltro } from 'src/app/relatorios/relatorio.service';
import { LazyLoadEvent, MessageService } from 'primeng/api';

import * as moment from 'moment';
import Swal from "sweetalert2/dist/sweetalert2.js";
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { SetorService } from '../setor/setor.service';
import { EncaminhamentoService } from '../atendimento/encaminhamento/encaminhamento.service';
import { DespachoService } from '../atendimento/despacho/despacho.service';
import { DespachoCobranca } from 'src/app/core/models/despacho-cobranca.model';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-despacho-cobranca',
  templateUrl: './despacho-cobranca.component.html',
  styleUrls: ['./despacho-cobranca.component.css']
})
export class DespachoCobrancaComponent implements OnInit {

  filtro = new RelatorioFiltro();
  atendimentoArea = [];
  setores!: any;
  buttonsImpressao = true;
  showLoaderDialogCobranca = false;
  anexos!: any;
  selectedAtendimentos: string[] = [];
  despachoCobranca = new DespachoCobranca();
  selectedTodos = false;
  codigos = [];
  totalRegistros = 0;
  



  constructor(
    private errorHandler: ErrorHandlerService,
    private setorService: SetorService,
    private encaminhamentoService: EncaminhamentoService,
    private despachoService: DespachoService,
    private messageService: MessageService,
    private sessionService: SessionService,
    private routeStateService: RouteStateService,
    private loaderService: LoaderService,
    private excelService: ExcelServiceService
  ) { }

  ngOnInit(): void {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoaderDialogCobranca = val;
    });
    this.carregarSetores();
    if (this.sessionService.getItem('filtro')) {
      this.filtro.dataInicial = new Date(this.sessionService.getItem('filtro').dataInicial);
      this.filtro.dataFinal = new Date(this.sessionService.getItem('filtro').dataFinal);

      this.filtro.prazoVencido = this.sessionService.getItem('filtro').prazoVencido;
      this.filtro.prazoVencer = this.sessionService.getItem('filtro').prazoVencer;
      this.filtro.despacho15diasatras = this.sessionService.getItem('filtro').despacho15diasatras;
      this.filtro.area = this.sessionService.getItem('filtro').area;
      
      this.despachoCobranca.setor = this.sessionService.getItem('filtro').area;

      this.atendimentoArea = this.sessionService.getItem('resultado');
      this.sessionService.removeItem('filtro'); 
    }else{
    this.buttonsImpressao = true;

    this.filtro.dataInicial = new Date(moment(new Date(), "YYYY-MM-DD").startOf('month').toString());
    this.filtro.dataFinal = new Date(moment(new Date(), "YYYY-MM-DD").endOf('month').toString());
    }
  }

  ngOnDestroy() {
    this.loaderService.status.observers.forEach(function (element) {
      element.complete();
    });
  }


  pesquisa(pagina = 0) {
    var diff = moment(this.filtro.dataFinal,"YYYY-MM-DD").diff(moment(this.filtro.dataInicial,"YYYY-MM-DD"));
    var dias = moment.duration(diff).asDays();
    if (this.filtro.dataFinal.getTime() < this.filtro.dataInicial.getTime()){
      Swal.fire(
        "Período inválido",
        "A data final deve ser maior que a data inicial",
        "warning"
      );
      return false;
    }
    if (dias > 90){
      Swal.fire(
        "Período inválido",
        "O período não pode ser superior a 90 dias",
        "warning"
      );
      return false;
    }
    if (this.despachoCobranca.setor === 0){
      Swal.fire(
        "Área não selecionada",
        "Informe uma área para pesquisar",
        "warning"
      );
      return false;
      }
    this.filtro.area = this.despachoCobranca.setor;
    if (this.filtro.prazoVencido === true && this.filtro.prazoVencer === true){
      this.filtro.prazo = "0";
    }else {
      if (this.filtro.prazoVencido === true){
        this.filtro.prazo = "1";
      }else if (this.filtro.prazoVencer === true){
        this.filtro.prazo = "2";
      }
      else{
        this.filtro.prazo = "0";
      }
    }
    this.filtro.pagina = pagina;
    this.loaderService.show();
    this.encaminhamentoService.listarEncaminhamentoAberto(this.filtro)
   .then(data =>{
     if (data.length == 0){
       this.messageService.add({ severity: 'success', detail: 'Nenhum encaminhamento encontrado!' });
       this.atendimentoArea = [];
     }else{
       //this.totalRegistros = data.atendimentos.totalElements;
       this.atendimentoArea = data;
       this.buttonsImpressao = false;
       this.sessionService.setItem('resultado', data);
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

aoMudarPagina(event: LazyLoadEvent) {
  const pagina = event.first / event.rows;
  if (this.atendimentoArea.length > 0) {
    this.pesquisa(pagina);
  }
}

enviarCobranca(){
  if (this.despachoCobranca.selectedAtendimentos.length === 0){
    Swal.fire("Selecione pelo menos uma manifestação para enviar", "", "warning");
    return;
  }
  if (this.despachoCobranca.selectedAtendimentos.length > 50){
     Swal.fire("Só é permitido o envio de no máximo 50 manifestações", "", "warning");
     return;
  }
  let codigos1 = [];
  var contador = 0;
  this.despachoCobranca.selectedAtendimentos.forEach(function(id) {
    codigos1[contador] = id.id;
    contador = contador + 1;
  });
  this.despachoCobranca.selectedAtendimentos = codigos1;
  this.loaderService.show();
  this.despachoService.enviarCobranca(this.despachoCobranca)
 .then(data =>{
  this.despachoCobranca.selectedAtendimentos = [];
 }
 ).then(res => {
  this.encaminhamentoService.listarEncaminhamentoAberto(this.filtro)
  .then(data =>{
    if (data.length == 0){
      this.messageService.add({ severity: 'success', detail: 'Nenhum encaminhamento encontrado!' });
      this.atendimentoArea = [];
    }else{
      //this.totalRegistros = data.atendimentos.totalElements;
      this.atendimentoArea = data;
      this.buttonsImpressao = false;
      this.sessionService.setItem('resultado', data);
    }
  }
  )
  .then(data =>{
    Swal.fire("Cobrança enviada com sucesso", "", "success");
    this.loaderService.hide();
  }
  )
  })
 .catch(erro => {
   this.loaderService.hide();
   this.errorHandler.handle(erro);
 });

}

  showAtendimento(idAtendimento: number){
    this.sessionService.setItem('filtro', this.filtro);
    this.routeStateService.add('Edição de Atendimento',
      '/main/atendimento/atendimento-cadastro', idAtendimento, false);
  }


  carregarSetores() {
    this.setorService.listar()
      .then(setores => {
        this.setores = setores.
          map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.atendimentoArea, 'relatorio_area');
  }

}
