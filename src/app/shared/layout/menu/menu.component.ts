import { EncaminhamentoService } from './../../../features/atendimento/encaminhamento/encaminhamento.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { AtendimentoService } from './../../../features/atendimento/atendimento.service';
import { UserDataService } from 'src/app/features/seguranca/user-data.service';
import { UserContextService } from 'src/app/core/services/user-context.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { UserIdleService } from 'angular-user-idle';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service'; 
import { SessionService } from 'src/app/core/services/session.service';
import { CustomMenuItem } from 'src/app/core/models/menu-item.model';
import { MenuDataService } from 'src/app/core/services/menu-data.service';
import { ApplicationStateService } from 'src/app/core/services/application-state.service';


@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})
export class MenuComponent implements OnInit {

    items: CustomMenuItem[];
    selectedItem: string;
    visible: boolean;
    qtdNovasManifestacoes!: number;
    qtdManifestacoesStatus!: number;
    qtdEncaminahmentosRec!: number;
    permissoes!: any;
    

    constructor(
    private router: Router,
    private routeStateService: RouteStateService,
    private errorHandler: ErrorHandlerService,
    private sessionService: SessionService,
    private userIdle: UserIdleService,
    private encaminhamentoService: EncaminhamentoService,
    private toastService: ToastService,
    private atendimentoService: AtendimentoService,
    private userContextService: UserContextService,
    private userDataService: UserDataService,
    private menuDataService: MenuDataService,
    private applicationStateService: ApplicationStateService) { }

    ngOnInit() {
        this.permissoes = this.userDataService.permissoesUsuario();
        this.items = this.menuDataService.getMenuList();
        this.qtdNovosAtendimentos();
        this.qtdEncaminhamentosRec();
        this.qtdAtendimentosClassifNaoEnc();
        var that = this;
        this.menuDataService.toggleMenuBar.subscribe(function (data: any) {
            if (data && data != null) {
                that.visible = !that.visible;
            }
        });

        if (this.applicationStateService.getIsMobileResolution()) {
            this.visible = false;
        } else {
            this.visible = true;
        }

        var activeMenu = this.sessionService.getItem("active-menu");
        if (activeMenu) {
            this.selectedItem = activeMenu;
        } else {
            this.selectedItem = "Home";
        }
    }

    refresh(): void {
        this.ngOnInit();
    }
    
    qtdNovosAtendimentos(){
      this.atendimentoService.novosAtendimentos()
      .then(resultado =>{
           this.qtdNovasManifestacoes = resultado;
      })
      .catch(erro => this.errorHandler.handle(erro));
    }

    qtdAtendimentosClassifNaoEnc(){
        this.atendimentoService.atendimentosClassifNaoEnc()
        .then(resultado =>{
             this.qtdManifestacoesStatus = resultado;
        })
        .catch(erro => this.errorHandler.handle(erro));
      }

     qtdEncaminhamentosRec(){
       this.encaminhamentoService.
        encaminhamentosRecebidos().
          then(resultado => {
              this.qtdEncaminahmentosRec = resultado;
       })
      .catch(erro => this.errorHandler.handle(erro));
    }

    ngOnDestroy() {
        this.menuDataService.toggleMenuBar.observers.forEach(function (element) { element.complete(); });
    }

    // on menu click event
    onMenuClick(menu: CustomMenuItem) {
        // if child are available then open child
        if (menu.Childs != undefined || menu.Childs != null) {
            this.toggleSubMenu(menu);
            return;
        }
        if (menu.RouterLink == undefined || menu.RouterLink == null || menu.RouterLink == "") {
            this.routeStateService.add("Error 404", "/error", null, false);
            return;
        }
        this.selectedItem = menu.Label;
        this.sessionService.setItem("active-menu", menu.Label);
        this.routeStateService.add(menu.Label, menu.RouterLink, null, true);
        // hide menu bar after menu click for mobile layout
        setTimeout(() => {
            if (this.applicationStateService.getIsMobileResolution()) {
                this.visible = false;
            }
        }, 100);
    }

    // toggle sub menu on click
    toggleSubMenu(menu: CustomMenuItem) {
        menu.IsChildVisible = !menu.IsChildVisible;
    }

     logout() {

    this.userDataService.logout()
    .then(() => {
      this.userIdle.stopWatching();
      this.routeStateService.removeAll();
      this.userContextService.logout();
      this.sessionService.removeItem('active-menu');
      this.router.navigate(['/login']);
    })
    .catch(erro => {
      this.toastService.addSingle('error', '', erro);
      return;
    });
  }

}
