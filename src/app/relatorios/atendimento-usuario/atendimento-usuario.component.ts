import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ExcelServiceService } from 'src/app/core/services/excel-service.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { RelatorioFiltro, RelatorioService } from '../relatorio.service';

import * as moment from 'moment';
import Swal from "sweetalert2/dist/sweetalert2.js";
import { LoginService } from 'src/app/features/login/login.service';
import { SessionService } from 'src/app/core/services/session.service';


@Component({
  selector: 'app-atendimento-usuario',
  templateUrl: './atendimento-usuario.component.html',
  styleUrls: ['./atendimento-usuario.component.css']
})
export class AtendimentoUsuarioComponent implements OnInit {

  filtro = new RelatorioFiltro();
  dados = [];
  rowGroupMetadata: any;
  showLoaderDialogRelatorio = false;
  usuarios!: any;
  descricaoNome: any;
  

 constructor(
   private relatorioService: RelatorioService,
   private errorHandler: ErrorHandlerService,
   private messageService: MessageService,
   private loaderService: LoaderService,
   private sessionService: SessionService,
   private excelService: ExcelServiceService,
   private routeStateService: RouteStateService,
   private loginService: LoginService
 ) { }

 ngOnInit(): void {
   this.loaderService.status.subscribe((val: boolean) => {
     this.showLoaderDialogRelatorio = val;
   });
   this.carregarUsuarios();
   if (this.sessionService.getItem('filtro')) {
    this.filtro.dataInicial = new Date(this.sessionService.getItem('filtro').dataInicial);
    this.filtro.dataFinal = new Date(this.sessionService.getItem('filtro').dataFinal);
    this.filtro.usuario = this.sessionService.getItem('filtro').usuario;
    this.dados = this.sessionService.getItem('rel_usuario');
    this.descricaoNome = this.sessionService.getItem('descricaoNome');
    this.sessionService.removeItem('filtro');
    this.sessionService.removeItem('descricaoNome');
    this.sessionService.removeItem('rel_usuario');
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


 carregarUsuarios() {
  this.loginService.listarUsuarios()
    .then(usuarios => {
      this.usuarios = usuarios.
        map((o: { nome: any; id: any; }) => ({ label: o.nome, value: o.id }));
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
    if (this.filtro.usuario == null){
      Swal.fire(
        "Nenhum usuário selecionado",
        "Selecione o usuário",
        "warning"
      );
      return false;
    }    
    if (this.filtro.alteradas == false && this.filtro.concluidas == false && this.filtro.despacho == false && this.filtro.encaminhadas == false && this.filtro.respostasParcial == false){
      Swal.fire(
        "Nenhum parâmetro selecionado",
        "Informe ao menos um parâmetro",
        "warning"
      );
      return false;
    }
      this.loaderService.show();

      this.relatorioService.pesquisarUsuario(this.filtro)
     .then(resultado =>{
       if (resultado.length == 0){
         this.messageService.add({ severity: 'success', detail: 'Nenhuma manifestação encontrada!' });
       }else{
        this.dados = resultado.lista;
        this.descricaoNome = resultado.nome;
        this.sessionService.setItem('rel_usuario', this.dados);
        this.sessionService.setItem('descricaoNome', this.descricaoNome);
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
       .atendimentoUsuario(this.filtro)
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
   this.excelService.exportAsExcelFile(this.dados, 'relatorio_usuario');
 }


 showAtendimento(idAtendimento: number){
  this.sessionService.setItem('filtro', this.filtro);
   this.routeStateService.add('Edição de Atendimento',
     '/main/atendimento/atendimento-cadastro', idAtendimento, false);
 }
}
