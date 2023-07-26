import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/core/models/user.model';
import { DescricaoEmail } from './../../core/models/descricao-email.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
})
export class DescricaoEmailService {

  descricaoEmailUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.descricaoEmailUrl = `${environment.apiUrl}/descricaoEmail`;
  }

    editar(): Promise<any>{
      return this.http.get<any>(`${this.descricaoEmailUrl}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data;
       });

    }

    atualizar(descricaoEmail: DescricaoEmail): Promise<DescricaoEmail> {
      return this.http.put<DescricaoEmail>(`${this.descricaoEmailUrl}/${descricaoEmail.id}`, descricaoEmail)
        .toPromise()
        .then(response => {
          const descricaoEmailAlterado = response;
          return descricaoEmailAlterado;
        });
    }

    adicionar(descricaoEmail: DescricaoEmail): Promise<DescricaoEmail> {
      this.user = this.sessionService.getItem("currentUser");
      descricaoEmail.orgao = this.user.orgao;
      return this.http.post<DescricaoEmail>(`${this.descricaoEmailUrl}`, descricaoEmail)
        .toPromise().then();
    }

}
