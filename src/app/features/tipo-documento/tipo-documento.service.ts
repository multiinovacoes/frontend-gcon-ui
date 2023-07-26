import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/core/models/user.model';
import { TipoDocumento } from './../../core/models/tipo-documento.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


export class TipoDocumentoFiltro {
  descricao!: string;
}

@Injectable({
    providedIn: 'root',
})
export class TipoDocumentoService {

  tipoDocumentoUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.tipoDocumentoUrl = `${environment.apiUrl}/tipoDocumentos`;
  }

  listar(): Promise<any> {

    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get<any>(`${this.tipoDocumentoUrl}/listar?`, {params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.tipoDocumentoDtoList;
     });
  }

  pesquisar(filtro: TipoDocumentoFiltro): Promise<any> {
    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.tipoDocumentoUrl}?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

    editar(codigo: number): Promise<any>{
      return this.http.get<any>(`${this.tipoDocumentoUrl}/${codigo}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data;
       });

    }

    atualizar(tipoDocumento: TipoDocumento): Promise<TipoDocumento> {
      return this.http.put<TipoDocumento>(`${this.tipoDocumentoUrl}/${tipoDocumento.id}`, tipoDocumento)
        .toPromise()
        .then(response => {
          const tipoManifestanteAlterado = response;
          return tipoManifestanteAlterado;''
        });
    }

    adicionar(tipoDocumento: TipoDocumento): Promise<TipoDocumento> {
      this.user = this.sessionService.getItem("currentUser");
      tipoDocumento.orgao = this.user.orgao;
      return this.http.post<TipoDocumento>(`${this.tipoDocumentoUrl}`, tipoDocumento)
        .toPromise().then();
    }

    excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.tipoDocumentoUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
    }
}
