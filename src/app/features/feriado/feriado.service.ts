import { User } from 'src/app/core/models/user.model';
import { SessionService } from 'src/app/core/services/session.service';
import { Feriado } from './../../core/models/feriado.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

export class FeriadoFiltro {
  descricao!: string;
}

@Injectable({
    providedIn: 'root',
})
export class FeriadoService {

  feriadoUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.feriadoUrl = `${environment.apiUrl}/feriados`;
  }

  listar(): Promise<any> {

    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get<any>(`${this.feriadoUrl}/listar?`, {params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data;
     });
  }

  pesquisar(filtro: FeriadoFiltro): Promise<any> {
    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.feriadoUrl}?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

    editar(codigo: number): Promise<any>{
      return this.http.get<any>(`${this.feriadoUrl}/${codigo}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
            this.converterStringsParaDatas(data);
             return data;
       });

    }

    atualizar(feriado: Feriado): Promise<Feriado> {
      return this.http.put<Feriado>(`${this.feriadoUrl}/${feriado.id}`, feriado)
        .toPromise()
        .then(response => {
          const feriadoAlterado = response;
          return feriadoAlterado;
        });
    }

    adicionar(feriado: Feriado): Promise<Feriado> {
      this.user = this.sessionService.getItem("currentUser");
      feriado.orgao = this.user.orgao;
      feriado.usuario = this.user.id;
      return this.http.post<Feriado>(`${this.feriadoUrl}`, feriado)
        .toPromise().then();
    }

    excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.feriadoUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
    }

    private converterStringsParaDatas(feriado: Feriado) {
      feriado.feriadoDto.dataFeriado = moment(feriado.feriadoDto.dataFeriado,
        'YYYY-MM-DD').toDate();
  }

}
