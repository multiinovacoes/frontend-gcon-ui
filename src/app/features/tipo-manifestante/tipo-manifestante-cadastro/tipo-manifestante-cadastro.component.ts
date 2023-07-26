import { MessageService } from 'primeng/api';
import { TipoManifestante } from './../../../core/models/tipo-manifestante.model';
import { TipoManifestanteService } from './../tipo-manifestante.service';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-tipo-manifestante-cadastro',
  templateUrl: 'tipo-manifestante-cadastro.component.html',
  styleUrls: ['tipo-manifestante-cadastro.component.css']
})
export class TipoManifestanteCadastroComponent implements OnInit {

  tipoManifestante = new TipoManifestante();
  status = [
    { label: 'Ativo', value: 0 },
    { label: 'Inativo', value: 1 },
  ];



  constructor(
    private tipoManifestanteService: TipoManifestanteService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private routeStateService: RouteStateService) { }

  ngOnInit() {
    var routeState = this.routeStateService.getCurrent();
    if (routeState.data > 0) {
      this.editarTipoManifestante(routeState.data);
    }else{
      this.tipoManifestante.status = 0;
    }
  }

  back() {
    this.routeStateService.loadPrevious();
  }

  editarTipoManifestante(codigo: number) {
    return this.tipoManifestanteService.editar(codigo)
    .then((tipoManifestante) => {
      this.tipoManifestante = tipoManifestante.tipoManifestanteDto
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.tipoManifestante.id)
  }


  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarTipoManifestante(form);
    } else {
      this.adicionarTipoManifestante(form);
    }
  }

  adicionarTipoManifestante(form: NgForm) {
    this.tipoManifestanteService.adicionar(this.tipoManifestante)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Tipo manifestante adicionado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTipoManifestante(form: NgForm) {
    this.tipoManifestanteService.atualizar(this.tipoManifestante)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Tipo manifestante atualizado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
