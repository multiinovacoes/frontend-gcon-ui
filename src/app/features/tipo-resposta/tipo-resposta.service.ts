import { TipoResposta } from './../../core/models/tipo-resposta.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


export class TipoRespostaFiltro {
  descricao!: string;
}

@Injectable({
    providedIn: 'root',
})
export class TipoRespostaService {

  tipoRespostaUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.tipoRespostaUrl = `${environment.apiUrl}/tiposRespostas`;
  }

  listar(): Promise<any> {

    return this.http.get<any>(`${this.tipoRespostaUrl}/listar`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.tipoRespostaDtoList;
     });
  }

  pesquisar(filtro: TipoRespostaFiltro): Promise<any> {
    let params = new HttpParams()

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.tipoRespostaUrl}?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

    editar(codigo: number): Promise<any>{
      return this.http.get<any>(`${this.tipoRespostaUrl}/${codigo}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data;
       });

    }

    atualizar(tipoResposta: TipoResposta): Promise<TipoResposta> {
      return this.http.put<TipoResposta>(`${this.tipoRespostaUrl}/${tipoResposta.id}`, tipoResposta)
        .toPromise()
        .then(response => {
          const tipoRespostaAlterado = response;
          return tipoRespostaAlterado;
        });
    }

    adicionar(tipoResposta: TipoResposta): Promise<TipoResposta> {
      return this.http.post<TipoResposta>(`${this.tipoRespostaUrl}`, tipoResposta)
        .toPromise().then();
    }

    excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.tipoRespostaUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
    }
}
