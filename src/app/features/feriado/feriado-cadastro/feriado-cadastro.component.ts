import { MessageService } from 'primeng/api';
import { FeriadoService } from './../feriado.service';
import { Feriado } from './../../../core/models/feriado.model';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-feriado-cadastro',
  templateUrl: 'feriado-cadastro.component.html',
  styleUrls: ['feriado-cadastro.component.css']
})
export class FeriadoCadastroComponent implements OnInit {

  feriado = new Feriado();
  status = [
    { label: 'Ativo', value: 0 },
    { label: 'Inativo', value: 1 },
  ];



  constructor(
    private feriadoService: FeriadoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private routeStateService: RouteStateService) { }

  ngOnInit() {
    var routeState = this.routeStateService.getCurrent();
    if (routeState.data > 0) {
      this.editarFeriado(routeState.data);
    }else{
      this.feriado.status = 0;
    }
  }

  back() {
    this.routeStateService.loadPrevious();
  }

  editarFeriado(codigo: number) {
    return this.feriadoService.editar(codigo)
    .then((feriado) => {
      this.feriado = feriado.feriadoDto
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.feriado.id)
  }


  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarFeriado(form);
    } else {
      this.adicionarFeriado(form);
    }
  }

  adicionarFeriado(form: NgForm) {
    this.feriadoService.adicionar(this.feriado)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Feriado adicionado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarFeriado(form: NgForm) {
    this.feriadoService.atualizar(this.feriado)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Feriado atualizado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
