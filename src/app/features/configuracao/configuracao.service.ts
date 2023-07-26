import { User } from 'src/app/core/models/user.model';
import { SessionService } from 'src/app/core/services/session.service';
import { Configuracao } from './../../core/models/configuracao.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
})
export class ConfiguracaoService {

  configuracaoUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.configuracaoUrl = `${environment.apiUrl}/configuracoes`;
  }

    editar(): Promise<any>{
      return this.http.get<any>(`${this.configuracaoUrl}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data;
       });

    }

    atualizar(configuracao: Configuracao): Promise<Configuracao> {
      return this.http.put<Configuracao>(`${this.configuracaoUrl}/${configuracao.id}`, configuracao)
        .toPromise()
        .then(response => {
          const configuracaoAlterado = response;
          return configuracaoAlterado;
        });
    }

    adicionar(configuracao: Configuracao): Promise<Configuracao> {
      this.user = this.sessionService.getItem("currentUser");
      configuracao.orgao = this.user.orgao;
      return this.http.post<Configuracao>(`${this.configuracaoUrl}`, configuracao)
        .toPromise().then();
    }

}
