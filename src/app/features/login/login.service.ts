import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlterarSenha } from 'src/app/core/models/alterar-senha.model';
import { User } from 'src/app/core/models/user.model';
import { SessionService } from 'src/app/core/services/session.service';




@Injectable({
    providedIn: 'root',
})
export class LoginService {

  loginUrl: string;
  headers = new HttpHeaders()
  user: User;


  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.loginUrl = `${environment.apiUrl}/login`;
    //this.carregaToken();
  }

//  carregaToken(){
  //  this.headers = new HttpHeaders()
    //.append('Content-Type', 'application/json')
    //.append('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjM5MDY2NzEsInVzZXJfbmFtZSI6ImNvbmVjdGEiLCJqdGkiOiJsQUlwR25xNlU4NGltUzlMSTcyTnRWQ0RtYVEiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.WhHNh4p3RE6rYDgeampCHqZ_3qD3a6F2M2FKrqUJScI')
   //}

    esqueceuSenha(email: string): Promise<any> {
      return this.http.post<any>(`${this.loginUrl}/esqueceu-senha`, email, { headers: this.headers })
        .toPromise().then();
    }

    alterarSenha(alterarSenha: AlterarSenha): Promise<any> {
      this.user = this.sessionService.getItem("currentUser");
      alterarSenha.idUsuario = this.user.id;
      return this.http.post<any>(`${this.loginUrl}/alterar-senha`, alterarSenha)
        .toPromise().then();
    }

    listarUsuarios(): Promise<any> {

      let params = new HttpParams()
      this.user = this.sessionService.getItem("currentUser");
      params = params.set('orgao', this.user.orgao.toString());
  
      return this.http.get<any>(`${this.loginUrl}/listar-usuario?`, {params})
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data.usuarioDtoList;
       });
    }

}
