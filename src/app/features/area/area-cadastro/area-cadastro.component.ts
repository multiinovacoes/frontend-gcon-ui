import { MessageService } from 'primeng/api';
import { AreaService } from './../area.service';
import { Area } from './../../../core/models/area.model';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-area-cadastro',
  templateUrl: 'area-cadastro.component.html',
  styleUrls: ['area-cadastro.component.css']
})
export class AreaCadastroComponent implements OnInit {

  area = new Area();
  status = [
    { label: 'Ativo', value: 0 },
    { label: 'Inativo', value: 1 },
  ];



  constructor(
    private areaService: AreaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private routeStateService: RouteStateService) {
    }

  ngOnInit() {

    var routeState = this.routeStateService.getCurrent();
    if (routeState.data > 0) {
      this.editarArea(routeState.data);
    }else{
      this.area.status = 0;
    }
  }

  back() {
    this.routeStateService.loadPrevious();
  }

  editarArea(codigo: number) {
    return this.areaService.editar(codigo)
    .then((area) => {
      this.area = area.areaDto
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.area.id)
  }


  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarArea(form);
    } else {
      this.adicionarArea(form);
    }
  }

  adicionarArea(form: NgForm) {
    this.areaService.adicionar(this.area)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Área adicionada com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarArea(form: NgForm) {
    this.areaService.atualizar(this.area)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Área atualizada com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
