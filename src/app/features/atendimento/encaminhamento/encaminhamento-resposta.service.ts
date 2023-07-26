import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/core/models/user.model';
import { Encaminhamento } from '../../../core/models/encaminhamento.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { EncaminhamentoResposta } from 'src/app/core/models/encaminhamento-resposta.model';
import { RespostaEncaminhamento } from 'src/app/core/models/resposta-encaminhamento.model';

@Injectable({
  providedIn: 'root'
})
export class EncaminhamentoRespostaService {

  encaminhamentoRespostaUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.encaminhamentoRespostaUrl = `${environment.apiUrl}/encaminhamentosResposta`;
   }

  adicionar(encaminhamentoResposta: EncaminhamentoResposta) {
    encaminhamentoResposta.usuario = this.sessionService.getItem("currentUser");
    return this.http.post<Encaminhamento>(`${this.encaminhamentoRespostaUrl}`, encaminhamentoResposta)
      .toPromise();
  }

  atualizar(encaminhamentoResposta: EncaminhamentoResposta) {
    return this.http.put<Encaminhamento>(`${this.encaminhamentoRespostaUrl}`, encaminhamentoResposta)
      .toPromise();
  }

  consultar(codigo: number): Promise<any> {
    return this.http.get<any>(`${this.encaminhamentoRespostaUrl}/${codigo}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.encaminhamentoRespostaDto;
     });
  }

  verificaResposta(codigoResposta: number): Promise<any> {
    return this.http.get<any>(`${this.encaminhamentoRespostaUrl}/enc/${codigoResposta}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data;   
     });
  }

  enviarResposta(respostaEncaminhamentoSetor: RespostaEncaminhamento): Promise<any> {
    return this.http.post<any>(`${this.encaminhamentoRespostaUrl}/resposta-setor`, respostaEncaminhamentoSetor)
      .toPromise();
  }


}
