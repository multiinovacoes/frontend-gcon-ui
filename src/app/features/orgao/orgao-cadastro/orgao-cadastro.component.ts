import { UtilService } from './../../../util.service';
import { Orgao } from 'src/app/core/models/orgao.model';
import { Component, OnInit } from '@angular/core';
import { OrgaoService } from 'src/app/features/orgao/orgao.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-orgao-cadastro',
  templateUrl: 'orgao-cadastro.component.html',
  styleUrls: ['orgao-cadastro.component.css']
})
export class OrgaoCadastroComponent implements OnInit {

  orgao = new Orgao();
  ufs = [];
  status = [
    { label: 'Ativo', value: 0 },
    { label: 'Inativo', value: 1 },
  ];

  generos = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
  ];

  dataAtual: Date = new Date();
  dataAtualISO = this.dataAtual;



  constructor(
    private orgaoService: OrgaoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private routeStateService: RouteStateService,
    private utilService: UtilService) { }

  ngOnInit() {
    this.ufs = this.utilService.listaUfs();
    let routeState = this.routeStateService.getCurrent();
    if (routeState.data > 0) {
      this.editarOrgao(routeState.data);
    }else{
      this.orgao.dataCriacao = this.dataAtualISO;
      this.orgao.status = 0;
    }
  }

  back() {
    this.routeStateService.loadPrevious();
  }

  editarOrgao(codigo: number) {
    return this.orgaoService.editar(codigo)
      .then((orgao) => {
        this.orgao = orgao.orgaoDto;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.orgao.id);
  }


  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarOrgao(form);
      this.messageService.add({ severity: 'success', detail: 'Empresa atualizada com sucesso!' });
    } else {
      this.adicionarOrgao(form);
      this.messageService.add({ severity: 'success', detail: 'Empresa adicionada com sucesso!' });
    }
  }

  adicionarOrgao(form: NgForm) {
    this.orgaoService.adicionar(this.orgao)
      .then(() => {
        this.back();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarOrgao(form: NgForm) {
    this.orgaoService.atualizar(this.orgao)
      .then(() => {
        this.back();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
