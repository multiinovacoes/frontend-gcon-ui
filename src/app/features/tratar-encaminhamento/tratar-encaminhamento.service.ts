import { TipoResposta } from './../../core/models/tipo-resposta.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable({
    providedIn: 'root',
})
export class TratarEncaminhamentoService {

  encaminhamentoUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.encaminhamentoUrl = `${environment.apiUrl}/encaminhamentos`;
  }

} 
