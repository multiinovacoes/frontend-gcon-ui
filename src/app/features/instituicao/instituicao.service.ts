import { Instituicao } from './../../core/models/instituicao.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {

  instituicaoUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.instituicaoUrl = `${environment.apiUrl}/instituicoes`;
  }

  listar(): Promise<any> {

    return this.http.get<any>(`${this.instituicaoUrl}/listar`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.instituicaoDtoList;
     });
  }


    editar(codigo: number): Promise<any>{
      return this.http.get<any>(`${this.instituicaoUrl}/${codigo}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data;
       });

    }

    atualizar(instituicao: Instituicao): Promise<Instituicao> {
      return this.http.put<Instituicao>(`${this.instituicaoUrl}/${instituicao.id}`, instituicao)
        .toPromise()
        .then(response => {
          const instituicaoAlterado = response;
          return instituicaoAlterado;
        });
    }

    adicionar(instituicao: Instituicao): Promise<Instituicao> {
      return this.http.post<Instituicao>(`${this.instituicaoUrl}`, instituicao)
        .toPromise().then();
    }

    excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.instituicaoUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
    }
}
