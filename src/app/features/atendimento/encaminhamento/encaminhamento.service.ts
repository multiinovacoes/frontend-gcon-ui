import { SessionService } from './../../../core/services/session.service';
import { UtilService } from './../../../util.service';
import { User } from './../../../core/models/user.model';
import { Encaminhamento } from './../../../core/models/encaminhamento.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { RelatorioFiltro } from 'src/app/relatorios/relatorio.service';
import { RespostaEncaminhamento } from 'src/app/core/models/resposta-encaminhamento.model';

@Injectable({
  providedIn: 'root'
})
export class EncaminhamentoService {

  encaminhamentoUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private utilService: UtilService,
    private sessionService: SessionService
  ) {
    this.encaminhamentoUrl = `${environment.apiUrl}/encaminhamentos`;
   }

   listar(codigoAtendimento: number): Promise<any> {

    return this.http.get<any>(`${this.encaminhamentoUrl}/listar/atendimento/${codigoAtendimento}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.encaminhamentoDtoList;
     });
  }

  listarEncaminhamentoAberto(filtro: RelatorioFiltro): Promise<any> {

    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('setor', filtro.area);
    params = params.set('prazo', filtro.prazo);
    if (filtro.despacho15diasatras === true){
      params = params.set('despacho15diasatras', '3');
    }
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());
    return this.http.get<any>(`${this.encaminhamentoUrl}/encaminhamento-aberto?`, {params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
      

          //const resultado = {
            //atendimentos: data,
            //total: data.totalElements
          //};

           return data;
     });
  }

  listarEncaminhamentoTratar(ano: any): Promise<any> {

    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('setor', this.user.setor.toString());
    params = params.set('ano', ano);

    return this.http.get<any>(`${this.encaminhamentoUrl}/encaminhamento-tratar?`, {params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data;
     });
  }

   encaminhamentoSatisfaz(codigoAtendimento: number): Promise<any> {

    return this.http.get<any>(`${this.encaminhamentoUrl}/listar/encaminhamento/resposta/${codigoAtendimento}`)
     .toPromise()
       .then(data => {
         return data.resposta;
       });
  }

  listarAbertos(codigoAtendimento: number): Promise<any> {
    return this.http.get<any>(`${this.encaminhamentoUrl}/listarAbertos/atendimento/${codigoAtendimento}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.encaminhamentoDtoList;
     });
  }

  adicionar(encaminhamento: Encaminhamento): Promise<Encaminhamento> {
    return this.http.post<Encaminhamento>(`${this.encaminhamentoUrl}`, encaminhamento)
      .toPromise();
  }

  enviarResposta(respostaEncaminhamento: RespostaEncaminhamento): Promise<RespostaEncaminhamento> {
    return this.http.post<RespostaEncaminhamento>(`${this.encaminhamentoUrl}`, respostaEncaminhamento)
      .toPromise();
  }

  consultarEncaminhamento(codigo: number): Promise<any> {

    return this.http.get<any>(`${this.encaminhamentoUrl}/${codigo}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.encaminhamentoDto;
     });
  }


  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.encaminhamentoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

    encaminhamentosRecebidos(): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get(`${this.encaminhamentoUrl}/encaminhamentosRecebidos?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

    encaminhamentosVencidos(mes: any, ano: any): Promise<any> {
      let params = new HttpParams()
      this.user = this.sessionService.getItem("currentUser");
      params = params.set('orgao', this.user.orgao.toString());
      params = params.set('mes', mes);
      params = params.set('ano', ano);
  
      return this.http.get(`${this.encaminhamentoUrl}/listar-enc-vencidos?`,{ params })
           .toPromise()
           .then(res => <any>res)
           .then(data => {
             return data;
       });
      }

      encaminhamentosNaoVencidos(mes: any, ano: any): Promise<any> {
        let params = new HttpParams()
        this.user = this.sessionService.getItem("currentUser");
        params = params.set('orgao', this.user.orgao.toString());
        params = params.set('mes', mes);
        params = params.set('ano', ano);
    
        return this.http.get(`${this.encaminhamentoUrl}/listar-enc-nao-vencidos?`,{ params })
             .toPromise()
             .then(res => <any>res)
             .then(data => {
               return data;
         });
        }      


        qtdEncaminhamentoSecretariaVencido(mes: any, ano: any): Promise<any> {
          let params = new HttpParams()
          this.user = this.sessionService.getItem("currentUser");
          params = params.set('orgao', this.user.orgao.toString());
          params = params.set('mes', mes);
          params = params.set('ano', ano);
      
          return this.http.get(`${this.encaminhamentoUrl}/listar-setor-enc-vencidos?`,{ params })
               .toPromise()
               .then(res => <any>res)
               .then(data => {
                 return data;
           });
          }        

          qtdEncaminhamentoSecretariaEnviada(mes: any, ano: any): Promise<any> {
            let params = new HttpParams()
            this.user = this.sessionService.getItem("currentUser");
            params = params.set('orgao', this.user.orgao.toString());
            params = params.set('mes', mes);
            params = params.set('ano', ano);
        
            return this.http.get(`${this.encaminhamentoUrl}/listar-setor-enc-enviados?`,{ params })
                 .toPromise()
                 .then(res => <any>res)
                 .then(data => {
                   return data;
             });
            }        

}
