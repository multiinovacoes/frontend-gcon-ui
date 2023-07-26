import { FormaResposta } from './../../core/models/forma-resposta.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable({
    providedIn: 'root',
})
export class FormaRespostaService {

  formaRespostaUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.formaRespostaUrl = `${environment.apiUrl}/formaRespostas`;
  }

  listar(): Promise<any> {

    return this.http.get<any>(`${this.formaRespostaUrl}/listar`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.formaRespostaDtoList;
     });
  }


    editar(codigo: number): Promise<any>{
      return this.http.get<any>(`${this.formaRespostaUrl}/${codigo}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data;
       });

    }

    atualizar(formaResposta: FormaResposta): Promise<FormaResposta> {
      return this.http.put<FormaResposta>(`${this.formaRespostaUrl}/${formaResposta.id}`, formaResposta)
        .toPromise()
        .then(response => {
          const formaRespostaAlterado = response;
          return formaRespostaAlterado;
        });
    }

    adicionar(formaResposta: FormaResposta): Promise<FormaResposta> {
      return this.http.post<FormaResposta>(`${this.formaRespostaUrl}`, formaResposta)
        .toPromise().then();
    }

    excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.formaRespostaUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
    }


}
