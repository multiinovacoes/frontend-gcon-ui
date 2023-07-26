import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/core/models/user.model';
import { ModeloDocumento } from './../../core/models/modelo-documento.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Encaminhamento } from 'src/app/core/models/encaminhamento.model';


export class ModeloDocumentoFiltro {
  descricao!: string;
}

@Injectable({
    providedIn: 'root',
})
export class ModeloDocumentoService {

  modeloDocumentoUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.modeloDocumentoUrl = `${environment.apiUrl}/modelosDoc`;
  }

  listar(): Promise<any> {

    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get<any>(`${this.modeloDocumentoUrl}/listar?`,{params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data;
     });
  }

  listarPorTipo(tipo: string): Promise<any[]> {

    let params = new HttpParams()
    params = params.set('tipo', tipo);
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());


    return this.http.get<any>(`${this.modeloDocumentoUrl}/modeloDocTipos?`, { params })
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.modeloDocumentoDtoList;
     });
  }

  pesquisar(filtro: ModeloDocumentoFiltro): Promise<any> {
    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.modeloDocumentoUrl}?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

    editar(codigo: number): Promise<any>{
      return this.http.get<any>(`${this.modeloDocumentoUrl}/${codigo}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data;
       });
    }

    atualizar(modeloDocumento: ModeloDocumento): Promise<ModeloDocumento> {
      return this.http.put<ModeloDocumento>(`${this.modeloDocumentoUrl}/${modeloDocumento.id}`, modeloDocumento)
        .toPromise()
        .then(response => {
          const modeloAlterado = response;
          return modeloAlterado;
        });
    }

    adicionar(modeloDocumento: ModeloDocumento): Promise<ModeloDocumento> {
      this.user = this.sessionService.getItem("currentUser");
      modeloDocumento.orgao = this.user.orgao;

      return this.http.post<ModeloDocumento>(`${this.modeloDocumentoUrl}`, modeloDocumento)
        .toPromise().then();
    }

    excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.modeloDocumentoUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
    }


    consultarModelo(codigo: number): Promise<ModeloDocumento>{
      return this.http.get<ModeloDocumento>(`${this.modeloDocumentoUrl}/${codigo}`)
      .toPromise()
       .then(data => {
         return data.modeloDocumentoDto;
       });
    }

    consultarModeloEnc(encaminhamento: any): Promise<any>{

      let params = new HttpParams()
      params = params.set('atendimento', encaminhamento.atendimento);
      params = params.set('setorDestino', encaminhamento.setorDestino);
      params = params.set('modeloDocumento',  encaminhamento.modeloDocumento);

      return this.http.get<ModeloDocumento>(`${this.modeloDocumentoUrl}/modeloDocEnc?`, { params })
      .toPromise()
       .then(data => {
         return data.resposta;
       });
    }

    consultarModeloOutros(codigoModelo: any, codigoAtendimento: any): Promise<any>{

      let params = new HttpParams()
      params = params.set('codigoAtendimento', codigoAtendimento);
      params = params.set('codigoModelo',  codigoModelo);

      return this.http.get<ModeloDocumento>(`${this.modeloDocumentoUrl}/modeloDocOutros?`, { params })
      .toPromise()
       .then(data => {
         return data.resposta;
       });
    }

}
