import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/core/models/user.model';
import { RespostaParcial } from './../../../core/models/resposta-parcial.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RespostaParcialService {

  respostaParcialUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.respostaParcialUrl = `${environment.apiUrl}/respostasParciais`;
   }

   listar(codigoAtendimento: number): Promise<any> {

    return this.http.get<any>(`${this.respostaParcialUrl}/listar/atendimento/${codigoAtendimento}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.respostaParcialDtoList;
     });
  }

  adicionar(respostaParcial: RespostaParcial): Promise<RespostaParcial> {

    this.user = this.sessionService.getItem("currentUser");
    respostaParcial.orgao = this.user.orgao;

    return this.http.post<RespostaParcial>(`${this.respostaParcialUrl}`, respostaParcial)
      .toPromise();
  }

  consultar(codigo: number): Promise<any> {

    return this.http.get<any>(`${this.respostaParcialUrl}/${codigo}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.respostaParcialDto;
     });
  }


  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.respostaParcialUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }


}
