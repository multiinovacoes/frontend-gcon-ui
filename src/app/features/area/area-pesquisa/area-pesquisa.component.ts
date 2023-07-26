import { AreaFiltro, AreaService } from './../area.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouteStateService } from 'src/app//core/services/route-state.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-area-pesquisa',
  templateUrl: 'area-pesquisa.component.html',
  styleUrls: ['area-pesquisa.component.css']
})
export class AreaPesquisaComponent implements OnInit {

  areas = [];
  area!: any;
  filtro = new AreaFiltro();
  @ViewChild('tabela') grid: Table;

  constructor(
    private areaService: AreaService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private routeStateService: RouteStateService
  ) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de área');
    this.listar();
  }

  listar() {
    this.areaService.listar()
      .then(areas =>{
        this.areas = areas;
      }
      )
      .catch(erro => this.errorHandler.handle(erro));
  }


  editarArea(codigo: number) {
    this.routeStateService.add('Edição de Área',
      '/main/area/area-cadastro', codigo, false);
  }

  novaArea() {
    this.routeStateService.add('Nova Área',
      '/main/area/area-cadastro', 0, false);
  }

  pesquisa() {
    this.areaService.pesquisar(this.filtro)
      .then(areas =>
        this.areas = areas.areaDtoList)
      .catch(erro => this.errorHandler.handle(erro));
  }

  excluir(area: any) {
    this.areaService.excluir(area.id)
      .then(() => {
        this.listar();
        this.grid.reset();
        this.messageService.add({ severity: 'success', detail: 'Área excluída com sucesso!' });
    })
      .catch(erro => this.errorHandler.handle(erro));
  }


  confirmarExclusao(area: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(area);
      }
    });
  }
}
