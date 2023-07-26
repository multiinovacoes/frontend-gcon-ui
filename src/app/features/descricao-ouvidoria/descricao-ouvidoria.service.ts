import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/core/models/user.model';
import { DescricaoOuvidoria } from './../../core/models/descricao-ouvidoria.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
})
export class DescricaoOuvidoriaService {

  descricaoOuvidoriaUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.descricaoOuvidoriaUrl = `${environment.apiUrl}/descricaoOuvidoria`;
  }

    editar(): Promise<any>{
      return this.http.get<any>(`${this.descricaoOuvidoriaUrl}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data;
       });

    }

    atualizar(descricaoOuvidoria: DescricaoOuvidoria): Promise<DescricaoOuvidoria> {
      return this.http.put<DescricaoOuvidoria>(`${this.descricaoOuvidoriaUrl}/${descricaoOuvidoria.id}`, descricaoOuvidoria)
        .toPromise()
        .then(response => {
          const descricaoOuvidoriaAlterado = response;
          return descricaoOuvidoriaAlterado;
        });
    }

    adicionar(descricaoOuvidoria: DescricaoOuvidoria): Promise<DescricaoOuvidoria> {
      this.user = this.sessionService.getItem("currentUser");
      descricaoOuvidoria.orgao = this.user.orgao;
      return this.http.post<DescricaoOuvidoria>(`${this.descricaoOuvidoriaUrl}`, descricaoOuvidoria)
        .toPromise().then();
    }

}
