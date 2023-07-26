import { MessageService } from 'primeng/api';
import { SetorService } from './../setor.service';
import { Setor } from './../../../core/models/setor.model';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-setor-cadastro',
  templateUrl: 'setor-cadastro.component.html',
  styleUrls: ['setor-cadastro.component.css']
})
export class SetorCadastroComponent implements OnInit {

  setor = new Setor();
  status = [
    { label: 'Ativo', value: 0 },
    { label: 'Inativo', value: 1 },
  ];

  generos = [
    { label: 'Masculino', value: '1' },
    { label: 'Feminino', value: '2' },
  ];

  statusResp = [
    { label: 'Dirigente', value: '0' },
    { label: 'Suplente', value: '1' },
  ]

  constructor(
    private setorService: SetorService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private routeStateService: RouteStateService) { }

  ngOnInit() {
    var routeState = this.routeStateService.getCurrent();
    if (routeState.data > 0) {
      this.editarSetor(routeState.data);
    }else{
      this.setor.status = 0;
    }
  }

  back() {
    this.routeStateService.loadPrevious();
  }

  editarSetor(codigo: number) {
    return this.setorService.editar(codigo)
    .then((setor) => {
      this.setor = setor.setorDto
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.setor.id)
  }


  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.adicionar(form);
    }
  }

  adicionar(form: NgForm) {
    this.setorService.adicionar(this.setor)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Setor adicionado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizar(form: NgForm) {
    this.setorService.atualizar(this.setor)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Setor atualizado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
