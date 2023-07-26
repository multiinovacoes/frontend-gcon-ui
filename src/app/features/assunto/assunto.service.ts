import { User } from 'src/app/core/models/user.model';
import { SessionService } from 'src/app/core/services/session.service';
import { Assunto } from './../../core/models/assunto.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';



export class AssuntoFiltro {
  area!: any;
}

@Injectable({
  providedIn: 'root',
})
export class AssuntoService {

  assuntoUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.assuntoUrl = `${environment.apiUrl}/assuntos`;

  }


  pesquisarAssunto(codigo: any): Promise<any> {
    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('area', codigo);

    return this.http.get(`${this.assuntoUrl}/listar/assuntos?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data.assuntoDtoList;
      });
  }


  listar(): Promise<any> {

    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());


    return this.http.get<any>(`${this.assuntoUrl}/listar?`, {params})
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;
      });
  }

  pesquisar(filtro: AssuntoFiltro): Promise<any> {
    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    if (filtro.area) {
      params = params.set('area', filtro.area);
    }

    return this.http.get(`${this.assuntoUrl}/listar/assuntos?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data.assuntoDtoList;
      });
  }

  editar(codigo: number): Promise<any> {
    return this.http.get<any>(`${this.assuntoUrl}/${codigo}`)
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;
      });

  }

  atualizar(assunto: Assunto): Promise<Assunto> {
    return this.http.put<Assunto>(`${this.assuntoUrl}/${assunto.id}`, assunto)
      .toPromise()
      .then(response => {
        const assuntoAlterado = response;
        return assuntoAlterado;
      });
  }

  adicionar(assunto: Assunto): Promise<Assunto> {
    this.user = this.sessionService.getItem("currentUser");
    assunto.orgao = this.user.orgao;

    return this.http.post<Assunto>(`${this.assuntoUrl}`, assunto)
      .toPromise().then();
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.assuntoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }


}
