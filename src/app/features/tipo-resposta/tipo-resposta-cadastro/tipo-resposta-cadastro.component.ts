import { MessageService } from 'primeng/api';
import { TipoRespostaService } from './../tipo-resposta.service';
import { TipoResposta } from './../../../core/models/tipo-resposta.model';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tipo-resposta-cadastro',
  templateUrl: 'tipo-resposta-cadastro.component.html',
  styleUrls: ['tipo-resposta-cadastro.component.css']
})
export class TipoRespostaCadastroComponent implements OnInit {

  tipoResposta = new TipoResposta();
  status = [
    { label: 'Ativo', value: 0 },
    { label: 'Inativo', value: 1 },
  ];



  constructor(
    private tipoRespostaService: TipoRespostaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private routeStateService: RouteStateService) { }

  ngOnInit() {
    var routeState = this.routeStateService.getCurrent();
    if (routeState.data > 0) {
      this.editarTipoResposta(routeState.data);
    }else{
      this.tipoResposta.status = 0;
    }
  }

  back() {
    this.routeStateService.loadPrevious();
  }

  editarTipoResposta(codigo: number) {
    return this.tipoRespostaService.editar(codigo)
    .then((tipoResposta) => {
      this.tipoResposta = tipoResposta.tipoRespostaDto
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.tipoResposta.id)
  }


  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarTipoResposta(form);
    } else {
      this.adicionarTipoResposta(form);
    }
  }

  adicionarTipoResposta(form: NgForm) {
    this.tipoRespostaService.adicionar(this.tipoResposta)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Tipo resposta adicionada com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTipoResposta(form: NgForm) {
    this.tipoRespostaService.atualizar(this.tipoResposta)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Tipo resposta atualizada com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
