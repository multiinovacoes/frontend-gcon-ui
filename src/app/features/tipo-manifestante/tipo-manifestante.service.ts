import { User } from 'src/app/core/models/user.model';
import { SessionService } from 'src/app/core/services/session.service';
import { TipoManifestante } from './../../core/models/tipo-manifestante.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


export class TipoManifestanteFiltro {
  descricao!: string;
}

@Injectable({
    providedIn: 'root',
})
export class TipoManifestanteService {

  tipoManifestanteUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.tipoManifestanteUrl = `${environment.apiUrl}/tiposManifestante`;
  }

  listar(): Promise<any> {

    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get<any>(`${this.tipoManifestanteUrl}/listar?`,{params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.tipoManifestanteDtoList;
     });
  }

  pesquisar(filtro: TipoManifestanteFiltro): Promise<any> {
    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.tipoManifestanteUrl}?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

    editar(codigo: number): Promise<any>{
      return this.http.get<any>(`${this.tipoManifestanteUrl}/${codigo}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data;
       });

    }

    atualizar(tipoManifestante: TipoManifestante): Promise<TipoManifestante> {
      return this.http.put<TipoManifestante>(`${this.tipoManifestanteUrl}/${tipoManifestante.id}`, tipoManifestante)
        .toPromise()
        .then(response => {
          const tipoManifestanteAlterado = response;
          return tipoManifestanteAlterado;''
        });
    }

    adicionar(tipoManifestante: TipoManifestante): Promise<TipoManifestante> {
      this.user = this.sessionService.getItem("currentUser");
      tipoManifestante.orgao = this.user.orgao;
      return this.http.post<TipoManifestante>(`${this.tipoManifestanteUrl}`, tipoManifestante)
        .toPromise().then();
    }

    excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.tipoManifestanteUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
    }
}
