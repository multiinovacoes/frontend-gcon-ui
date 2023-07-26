import { Despacho } from './../../../core/models/despacho.model';
import { HttpClient,HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { DespachoCobranca } from 'src/app/core/models/despacho-cobranca.model';

@Injectable({
  providedIn: 'root'
})
export class DespachoService {

  despachoUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.despachoUrl = `${environment.apiUrl}/despachos`;
   }

   listar(codigoAtendimento: number): Promise<any> {

    return this.http.get<any>(`${this.despachoUrl}/listar/atendimento/${codigoAtendimento}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.despachoDtoList;
     });
  }

  adicionar(despacho: Despacho): Promise<Despacho> {
    return this.http.post<Despacho>(`${this.despachoUrl}`, despacho)
      .toPromise();
  }

  enviarCobranca(despachoCobranca: DespachoCobranca): Promise<Despacho> {
    return this.http.post<Despacho>(`${this.despachoUrl}/enviar-despacho-cobranca`, despachoCobranca)
      .toPromise();
  }

  consultar(codigo: number): Promise<any> {

    return this.http.get<any>(`${this.despachoUrl}/${codigo}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.despachoDto;
     });
  }


  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.despachoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }


}
