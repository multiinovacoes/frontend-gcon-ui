import { MessageService } from 'primeng/api';
import { OrigemManifestacaoService } from './../origem-manifestacao.service';
import { OrigemManifestacao } from './../../../core/models/origem-manifestacao.model';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-origem-manifestacao-cadastro',
  templateUrl: 'origem-manifestacao-cadastro.component.html',
  styleUrls: ['origem-manifestacao-cadastro.component.css']
})
export class OrigemManifestacaoCadastroComponent implements OnInit {

  origemManifestacao = new OrigemManifestacao();
  status = [
    { label: 'Ativo', value: 0 },
    { label: 'Inativo', value: 1 },
  ];



  constructor(
    private origemManifestacaoService: OrigemManifestacaoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private routeStateService: RouteStateService) { }

  ngOnInit() {
    var routeState = this.routeStateService.getCurrent();
    if (routeState.data > 0) {
      this.editarOrigemManifestacao(routeState.data);
    }else{
      this.origemManifestacao.status = 0;
    }
  }

  back() {
    this.routeStateService.loadPrevious();
  }

  editarOrigemManifestacao(codigo: number) {
    return this.origemManifestacaoService.editar(codigo)
    .then((origemManifestacao) => {
      this.origemManifestacao = origemManifestacao.origemManifestacaoDto
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.origemManifestacao.id)
  }


  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarOrigemManifestacao(form);
    } else {
      this.adicionarOrigemManifestacao(form);
    }
  }

  adicionarOrigemManifestacao(form: NgForm) {
    this.origemManifestacaoService.adicionar(this.origemManifestacao)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Origem adicionada com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarOrigemManifestacao(form: NgForm) {
    this.origemManifestacaoService.atualizar(this.origemManifestacao)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Origem atualizada com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
