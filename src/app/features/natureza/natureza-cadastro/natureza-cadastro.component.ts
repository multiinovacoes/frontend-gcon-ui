import { MessageService } from 'primeng/api';
import { Natureza } from 'src/app/core/models/natureza.model';
import { Component, OnInit } from '@angular/core';
import { NaturezaService } from 'src/app/features/natureza/natureza.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-natureza-cadastro',
  templateUrl: 'natureza-cadastro.component.html',
  styleUrls: ['natureza-cadastro.component.css']
})
export class NaturezaCadastroComponent implements OnInit {

  natureza = new Natureza();
  status = [
    { label: 'Ativo', value: 0 },
    { label: 'Inativo', value: 1 },
  ];



  constructor(
    private naturezaService: NaturezaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private routeStateService: RouteStateService) { }

  ngOnInit() {
    var routeState = this.routeStateService.getCurrent();
    if (routeState.data > 0) {
      this.editarNatureza(routeState.data);
    }else{
      this.natureza.status = 0;
    }
  }

  back() {
    this.routeStateService.loadPrevious();
  }

  editarNatureza(codigo: number) {
    return this.naturezaService.editar(codigo)
    .then((natureza) => {
      this.natureza = natureza.naturezaDto
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.natureza.id)
  }


  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarNatureza(form);
      this.messageService.add({ severity: 'success', detail: 'Natureza salva com sucesso!' });
    } else {
      this.adicionarNatureza(form);
      this.messageService.add({ severity: 'success', detail: 'Natureza atualizada com sucesso!' });
    }
  }

  adicionarNatureza(form: NgForm) {
    this.naturezaService.adicionar(this.natureza)
    .then(() => {
      this.back();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarNatureza(form: NgForm) {
    this.naturezaService.atualizar(this.natureza)
    .then(() => {
      this.back();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
