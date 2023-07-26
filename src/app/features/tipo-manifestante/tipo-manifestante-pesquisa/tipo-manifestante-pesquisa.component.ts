import { Table } from 'primeng/table';
import { TipoManifestanteFiltro, TipoManifestanteService } from './../tipo-manifestante.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouteStateService } from 'src/app//core/services/route-state.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-tipo-manifestante-pesquisa',
  templateUrl: 'tipo-manifestante-pesquisa.component.html',
  styleUrls: ['tipo-manifestante-pesquisa.component.css']
})
export class TipoManifestantePesquisaComponent implements OnInit {

  tiposManifestante = [];
  tipoManifestante!: any;
  filtro = new TipoManifestanteFiltro();
  @ViewChild('tabela') grid: Table;

  constructor(
    private tipoManifestanteService: TipoManifestanteService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private routeStateService: RouteStateService
  ) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de tipos de manifestante');
    this.listar();
  }

  listar() {
    this.tipoManifestanteService.listar()
      .then(tiposManifestante =>{
        this.tiposManifestante = tiposManifestante;
      }
      )
      .catch(erro => this.errorHandler.handle(erro));
  }


  editarTipoManifestante(codigo: number) {
    this.routeStateService.add('Edição de Tipo Manifestante',
      '/main/tipo-manifestante/tipo-manifestante-cadastro', codigo, false);
  }

  novoTipoManifestante() {
    this.routeStateService.add('Novo Tipo Manifestante',
      '/main/tipo-manifestante/tipo-manifestante-cadastro', 0, false);
  }

  pesquisa() {
    this.tipoManifestanteService.pesquisar(this.filtro)
      .then(tiposManifestante =>
        this.tiposManifestante = tiposManifestante.tipoManifestanteDtoList)
      .catch(erro => this.errorHandler.handle(erro));
  }

  excluir(tipoManifestante: any) {
    this.tipoManifestanteService.excluir(tipoManifestante.id)
      .then(() => {
        this.listar();
        this.grid.reset();
        this.messageService.add({ severity: 'success', detail: 'Tipo manifestante excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  confirmarExclusao(tipoManifestante: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(tipoManifestante);
      }
    });
  }
}
