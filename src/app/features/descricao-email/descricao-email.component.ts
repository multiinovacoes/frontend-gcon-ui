import { MessageService } from 'primeng/api';
import { DescricaoEmail } from './../../core/models/descricao-email.model';
import { DescricaoEmailService } from './descricao-email.service';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-descricao-email',
  templateUrl: 'descricao-email.component.html',
  styleUrls: ['descricao-email.component.css']
})
export class DescricaoEmailComponent implements OnInit {

  descricaoEmail = new DescricaoEmail();


  constructor(
    private descricaoEmailService: DescricaoEmailService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private routeStateService: RouteStateService) { }

  ngOnInit() {
    var routeState = this.routeStateService.getCurrent();
    this.editar();
  }

  back() {
    this.routeStateService.loadPrevious();
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.adicionar(form);
    }
  }


  editar() {
    return this.descricaoEmailService.editar()
    .then((descricaoEmail) => {
      this.descricaoEmail = descricaoEmail.descricaoEmailDto
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.descricaoEmail.id)
  }

  adicionar(form: NgForm) {
    this.descricaoEmailService.adicionar(this.descricaoEmail)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Mensagem cadastrada com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  atualizar(form: NgForm) {
    this.descricaoEmailService.atualizar(this.descricaoEmail)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Mensagem atualizada com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


}
