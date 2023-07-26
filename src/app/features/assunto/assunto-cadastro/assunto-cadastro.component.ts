import { MessageService } from 'primeng/api';
import { AreaService } from './../../area/area.service';
import { Assunto } from './../../../core/models/assunto.model';
import { AssuntoService } from './../assunto.service';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-assunto-cadastro',
  templateUrl: 'assunto-cadastro.component.html',
  styleUrls: ['assunto-cadastro.component.css']
})
export class AssuntoCadastroComponent implements OnInit {

  assunto = new Assunto();
  areas!: any;
  status = [
    { label: 'Ativo', value: 0 },
    { label: 'Inativo', value: 1 },
  ];

  constructor(
    private assuntoService: AssuntoService,
    private messageService: MessageService,
    private areaService: AreaService,
    private errorHandler: ErrorHandlerService,
    private routeStateService: RouteStateService) { }

  ngOnInit() {
    this.carregarAreas();
    var routeState = this.routeStateService.getCurrent();
    if (routeState.data > 0) {
      this.editarAssunto(routeState.data);
    }else{
      this.assunto.status = 0;
    }
  }

  back() {
    this.routeStateService.loadPrevious();
  }

  editarAssunto(codigo: number) {
    return this.assuntoService.editar(codigo)
    .then((assunto) => {
      this.assunto = assunto.assuntoDto
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.assunto.id)
  }


  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarAssunto(form);
    } else {
      this.adicionarAssunto(form);
    }
  }

  adicionarAssunto(form: NgForm) {
    this.assuntoService.adicionar(this.assunto)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Assunto adicionado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarAssunto(form: NgForm) {
    this.assuntoService.atualizar(this.assunto)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Assunto atualizado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarAreas() {
    this.areaService.listar()
      .then(areas => {
        this.areas = areas.
          map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
