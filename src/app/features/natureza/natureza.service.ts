import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Natureza } from 'src/app/core/models/natureza.model';


export class NaturezaFiltro {
  descricao!: string;
}

@Injectable({
    providedIn: 'root',
})
export class NaturezaService {

  naturezaUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.naturezaUrl = `${environment.apiUrl}/naturezas`;
  }

  listar(): Promise<any> {

    return this.http.get<any>(`${this.naturezaUrl}/listar`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data;
     });
  }

  pesquisar(filtro: NaturezaFiltro): Promise<any> {
    let params = new HttpParams()

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.naturezaUrl}?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

    editar(codigo: number): Promise<any>{
      return this.http.get<any>(`${this.naturezaUrl}/${codigo}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data;
       });

    }

    atualizar(natureza: Natureza): Promise<Natureza> {
      return this.http.put<Natureza>(`${this.naturezaUrl}/${natureza.id}`, natureza)
        .toPromise()
        .then(response => {
          const naturezaAlterado = response;
          return naturezaAlterado;
        });
    }

    adicionar(natureza: Natureza): Promise<Natureza> {
      return this.http.post<Natureza>(`${this.naturezaUrl}`, natureza)
        .toPromise().then();
    }

    excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.naturezaUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
    }


}
