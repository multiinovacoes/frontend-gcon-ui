import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/features/seguranca/user-data.service';
import { User } from 'src/app/core/models/user.model';
import { ToastService } from 'src/app/core/services/toast.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { SessionService } from 'src/app/core/services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { UserContextService } from 'src/app/core/services/user-context.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit { 

  userName: string;

  password: string;

  locale: string;

  version: string;

  msgs: any[];

  user = new User();

  constructor(
    private userService: UserDataService,
    private toastService: ToastService,
    private routeStateService: RouteStateService,
    private sessionService: SessionService,
    public translate: TranslateService,
    private userContextService: UserContextService
  ) { }

  ngOnInit() {
    let user = {
      id: 1,
      username: "admin",
      password: "password",
      email: "admin@admin.com",
      nome: "Admin"
  };

    this.userName = "";
    this.password = "";
    this.locale = this.sessionService.getItem("ng-prime-language");
    this.version = environment.version;
    this.msgs = [{ severity: 'info', detail: 'UserName: admin' }, { severity: 'info', detail: 'Password: password' }];
  }

  onClickLogin() {
    this.userService.getUserByUserNameAndPassword(this.userName, this.password)
      .then(() => {
        this.user.nome = this.userService.jwtPayload.nome;
        this.user.orgao = this.userService.jwtPayload.id_orgao;
        this.user.setor = this.userService.jwtPayload.id_setor;
        this.user.id = this.userService.jwtPayload.id_usuario;
        this.userContextService.setUser(this.user);
        this.routeStateService.add("Dashboard", '/main/dashboard', null, true);
        return;
        })
      .catch(erro => {
        this.toastService.addSingle('error', '', erro);
        return;
      });

  }

  onLanguageChange($event) {
    this.locale = $event.target.value;
    if (this.locale == undefined || this.locale == null || this.locale.length == 0) {
      this.locale = "en";
    }
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(this.locale);
    this.sessionService.setItem("ng-prime-language", this.locale);
  }

}
