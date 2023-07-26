import { User } from 'src/app/core/models/user.model';
import { SessionService } from 'src/app/core/services/session.service';
import { Setor } from './../../core/models/setor.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


export class SetorFiltro {
  descricao!: string;
}

@Injectable({
    providedIn: 'root',
})
export class SetorService {

  setorUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.setorUrl = `${environment.apiUrl}/setores`;
  }

  listar(): Promise<any> {

    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get<any>(`${this.setorUrl}/listar?`,{params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.setorDtoList;
     });
  }

  listarEspecificoSemSetorEncaminhadoAberto(codigoAtendimento: number): Promise<any> {

    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('atendimento', codigoAtendimento.toString());

    return this.http.get<any>(`${this.setorUrl}/listarEspecifico?`, {params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.setorDtoList;
     });
  }


  listarEspecifico(codigoAtendimento: number): Promise<any> {

    return this.http.get<any>(`${this.setorUrl}/listarEspecifico/${codigoAtendimento}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.setorDtoList;
     });
  }

  pesquisar(filtro: SetorFiltro): Promise<any> {
    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.setorUrl}?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

    editar(codigo: number): Promise<any>{
      return this.http.get<any>(`${this.setorUrl}/${codigo}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data;
       });

    }

    atualizar(setor: Setor): Promise<Setor> {
      return this.http.put<Setor>(`${this.setorUrl}/${setor.id}`, setor)
        .toPromise()
        .then(response => {
          const setorAlterado = response;
          return setorAlterado;
        });
    }

    adicionar(setor: Setor): Promise<Setor> {
      this.user = this.sessionService.getItem("currentUser");
      setor.orgao = this.user.orgao;
      return this.http.post<Setor>(`${this.setorUrl}`, setor)
        .toPromise().then();
    }

    excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.setorUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
    }
}
