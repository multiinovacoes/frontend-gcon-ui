import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/core/models/user.model';
import { Bairro } from './../../core/models/bairro.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable({
    providedIn: 'root',
})
export class BairroService {

  bairroUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.bairroUrl = `${environment.apiUrl}/bairros`;
  }

  listar(): Promise<any> {

    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get<any>(`${this.bairroUrl}/listar`, {params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.bairroDtoList;
     });
  }


    editar(codigo: number): Promise<any>{
      return this.http.get<any>(`${this.bairroUrl}/${codigo}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data;
       });

    }

    atualizar(bairro: Bairro): Promise<Bairro> {
      return this.http.put<Bairro>(`${this.bairroUrl}/${bairro.id}`, bairro)
        .toPromise()
        .then(response => {
          const bairroAlterado = response;
          return bairroAlterado;
        });
    }

    adicionar(area: Bairro): Promise<Bairro> {
      return this.http.post<Bairro>(`${this.bairroUrl}`, area)
        .toPromise().then();
    }

    excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.bairroUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
    }


}
