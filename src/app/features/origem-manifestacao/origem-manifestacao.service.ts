import { OrigemManifestacao } from './../../core/models/origem-manifestacao.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


export class OrigemManifestacaoFiltro {
  descricao!: string;
}

@Injectable({
    providedIn: 'root',
})
export class OrigemManifestacaoService {

  origemManifestacaoUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.origemManifestacaoUrl = `${environment.apiUrl}/origens`;
  }

  listar(): Promise<any> {

    return this.http.get<any>(`${this.origemManifestacaoUrl}/listar`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.origemManifestacaoDtoList;
     });
  }

  pesquisar(filtro: OrigemManifestacaoFiltro): Promise<any> {
    let params = new HttpParams()

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.origemManifestacaoUrl}?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

    editar(codigo: number): Promise<any>{
      return this.http.get<any>(`${this.origemManifestacaoUrl}/${codigo}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data;
       });

    }

    atualizar(origemManifestacao: OrigemManifestacao): Promise<OrigemManifestacao> {
      return this.http.put<OrigemManifestacao>(`${this.origemManifestacaoUrl}/${origemManifestacao.id}`, origemManifestacao)
        .toPromise()
        .then(response => {
          const naturezaAlterado = response;
          return naturezaAlterado;
        });
    }

    adicionar(origemManifestacao: OrigemManifestacao): Promise<OrigemManifestacao> {
      return this.http.post<OrigemManifestacao>(`${this.origemManifestacaoUrl}`, origemManifestacao)
        .toPromise().then();
    }

    excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.origemManifestacaoUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
    }


}
