import { PaginacaoPainel } from './../painel/lista-novas-manifestacoes/lista-novas-manifestacoes.component';
import { AtendimentoConclusao } from './../../core/models/atendimentoConclusao.model';
import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/core/models/user.model';
import { UtilService } from './../../util.service';
import { Atendimento } from './../../core/models/atendimento.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PesquisaSatisfacao } from 'src/app/core/models/pesquisa-satisfacao.model';

export class AtendimentoFilter {
  solicitante = null;
  dataInicio = null;
  dataFinal = null;
  assunto = null;
  palavraChave = null;
  protocolo = null;
  documento = null;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
    providedIn: 'root',
})
export class AtendimentoService {

  atendimentoUrl: string;
  logUrl: string;
  pesquisaSatisfacaoUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.atendimentoUrl = `${environment.apiUrl}/atendimentos`;
    this.logUrl = `${environment.apiUrl}/logs`;
    this.pesquisaSatisfacaoUrl = `${environment.apiUrl}/pesquisaSatisfacao`;
  }

  listar(): Promise<any> {

    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get<any>(`${this.atendimentoUrl}/listar?`,{params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data;
     });
  }

  pesquisar(filtro: AtendimentoFilter): Promise<any> {
    let params = new HttpParams()
    if (filtro.solicitante) {
      params = params.set('solicitante', filtro.solicitante);
    }

    if (filtro.dataInicio) {
      params = params.set('dataInicio', filtro.dataInicio);
    }

    if (filtro.dataFinal) {
      params = params.set('dataFinal', filtro.dataFinal);
    }

    if (filtro.protocolo) {
      params = params.set('protocolo', filtro.protocolo);
    }

    if (filtro.palavraChave) {
      params = params.set('palavraChave', filtro.palavraChave);
    }

    if (filtro.documento) {
      params = params.set('documento', filtro.documento);
    }

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    return this.http.get(`${this.atendimentoUrl}?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
          const resultado = {
            atendimentos: data.atendimentoDtoList,
            total: data.atendimentoDtoList.totalElements
          };

           return resultado;
     });
    }

  novosAtendimentos(): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get<any>(`${this.atendimentoUrl}/listarNovos?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

    atendimentosVencidos(mes: any, ano: any): Promise<any> {
      let params = new HttpParams()
      this.user = this.sessionService.getItem("currentUser");
      params = params.set('orgao', this.user.orgao.toString());
      params = params.set('mes', mes);
      params = params.set('ano', ano);
  
      return this.http.get<any>(`${this.atendimentoUrl}/atendimentos-vencidos?`,{ params })
           .toPromise()
           .then(res => <any>res)
           .then(data => {
             return data;
       });
      }

      atendimentosNaoVencidos(mes: any, ano: any): Promise<any> {
        let params = new HttpParams()
        this.user = this.sessionService.getItem("currentUser");
        params = params.set('orgao', this.user.orgao.toString());
        params = params.set('mes', mes);
        params = params.set('ano', ano);
    
        return this.http.get<any>(`${this.atendimentoUrl}/atendimentos-nao-vencidos?`,{ params })
             .toPromise()
             .then(res => <any>res)
             .then(data => {
               return data;
         });
        }

    atendimentosClassifNaoEnc(): Promise<any> {
      let params = new HttpParams()
      this.user = this.sessionService.getItem("currentUser");
      params = params.set('orgao', this.user.orgao.toString());
  
      return this.http.get<any>(`${this.atendimentoUrl}/atendimentos-status?`,{ params })
           .toPromise()
           .then(res => <any>res)
           .then(data => {
             return data;
       });
      }


    listaPesquisaSatisfacao(): Promise<any> {
      let params = new HttpParams()
      this.user = this.sessionService.getItem("currentUser");
      params = params.set('orgao', this.user.orgao.toString());
  
      return this.http.get<any>(`${this.pesquisaSatisfacaoUrl}/lista-pesquisa-satisfacao?`,{ params })
           .toPromise()
           .then(res => <any>res)
           .then(data => {
             return data;
       });
      }   
      
      salvarPesquisaSatisfacao(pesquisa: PesquisaSatisfacao): Promise<any> {
        return this.http.post<PesquisaSatisfacao>(`${this.atendimentoUrl}/pesquisaSatisfacao`, pesquisa)
          .toPromise();
      }

  qtdAtendimentosMes(mes: any, ano: any): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('mes', mes);
    params = params.set('ano', ano);

    return this.http.get(`${this.atendimentoUrl}/totalAtendimentosMes?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

  qtdAtendimentosMesConcluidos(): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get(`${this.atendimentoUrl}/totalAtendimentosMesConcluidos?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

    qtdAvaliacaoPesquisa(ano: any): Promise<any> {
      let params = new HttpParams()
      this.user = this.sessionService.getItem("currentUser");
      params = params.set('orgao', this.user.orgao.toString());     
      params = params.set('ano', ano);     
  
      return this.http.get(`${this.atendimentoUrl}/avaliacao-pesquisa-satisfacao?`,{ params })
           .toPromise()
           .then(res => <any>res)
           .then(data => {
             return data;
       });
      }
    

    qtdAtendimentosOrigem(ano: any): Promise<any> {
      let params = new HttpParams()
      this.user = this.sessionService.getItem("currentUser");
      params = params.set('orgao', this.user.orgao.toString());     
      params = params.set('ano', ano);     
  
      return this.http.get(`${this.atendimentoUrl}/totalAtendimentosOrigemManifestacao?`,{ params })
           .toPromise()
           .then(res => <any>res)
           .then(data => {
             return data;
       });
      }

  qtdAtendimentosNatureza(ano: any): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());     
    params = params.set('ano', ano);   

    return this.http.get(`${this.atendimentoUrl}/totalAtendimentosNatureza?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

    qtdAtendimentosSecretaria(mes: any, ano: any): Promise<any> {
      let params = new HttpParams()
      this.user = this.sessionService.getItem("currentUser");
      params = params.set('orgao', this.user.orgao.toString());
      params = params.set('mes', mes);
      params = params.set('ano', ano);
  
      return this.http.get(`${this.atendimentoUrl}/totalAtendimentosSecretaria?`,{ params })
           .toPromise()
           .then(res => <any>res)
           .then(data => {
             return data;
       });
      }



      qtdAtendimentosNaturezaDashboard(mes: any, ano: any): Promise<any> {
        let params = new HttpParams()
        this.user = this.sessionService.getItem("currentUser");
        params = params.set('orgao', this.user.orgao.toString());    
        params = params.set('mes', mes);
        params = params.set('ano', ano); 
    
        return this.http.get(`${this.atendimentoUrl}/totalAtendimentosNaturezaDashboard?`,{ params })
             .toPromise()
             .then(res => <any>res)
             .then(data => {
               return data;
         });
        }

      qtdAtendimentosSecretariaNatureza(ano: any): Promise<any> {
        let params = new HttpParams()
        this.user = this.sessionService.getItem("currentUser");
        params = params.set('orgao', this.user.orgao.toString());
        params = params.set('ano', ano);
    
        return this.http.get(`${this.atendimentoUrl}/totalAtendimentosSetorNatureza?`,{ params })
             .toPromise()
             .then(res => <any>res)
             .then(data => {
               return data;
         });
        }
  

      qtdAtendimentosResolutividade(ano: any): Promise<any> {
        let params = new HttpParams()
        this.user = this.sessionService.getItem("currentUser");
        params = params.set('orgao', this.user.orgao.toString());
        params = params.set('ano', ano);
    
        return this.http.get(`${this.atendimentoUrl}/totalAtendimentosResolutividade?`,{ params })
             .toPromise()
             .then(res => <any>res)
             .then(data => {
               return data;
         });
        }

      qtdAtendimentosAssunto(ano: any): Promise<any> {
        let params = new HttpParams()
        this.user = this.sessionService.getItem("currentUser");
        params = params.set('orgao', this.user.orgao.toString());
        params = params.set('ano', ano);
    
        return this.http.get(`${this.atendimentoUrl}/totalAtendimentosAssunto?`,{ params })
             .toPromise()
             .then(res => <any>res)
             .then(data => {
               return data;
         });
        }

      qtdAtendimentosAnual(ano: any): Promise<any> {
        let params = new HttpParams()
        this.user = this.sessionService.getItem("currentUser");
        params = params.set('orgao', this.user.orgao.toString());
        params = params.set('ano', ano);
    
        return this.http.get(`${this.atendimentoUrl}/totalAtendimentos?`,{ params })
             .toPromise()
             .then(res => <any>res)
             .then(data => {
               return data;
         });
        }  

    novo(): Promise<any>{
      return this.http.get<any>(`${this.atendimentoUrl}/novo-atendimento`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data.atendimentoDto;
       });
    }

    editar(codigo: number): Promise<any>{
      let params = new HttpParams()
      params = params.set('codigo', codigo.toString());
      return this.http.get<any>(`${this.atendimentoUrl}/${codigo}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data.atendimentoDto;
       });
    }

    buscarAtendimento(codigoEncaminhamento: number): Promise<any>{
      let params = new HttpParams()
      params = params.set('codigoEncaminhamento', codigoEncaminhamento.toString());
      return this.http.get<any>(`${this.atendimentoUrl}/enc/${codigoEncaminhamento}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data.atendimentoDto;
       });
    }

      pesquisaProtocolo(numeroProtocolo: string): Promise<any>{
         let params = new HttpParams()
         params = params.set('numeroProtocolo', numeroProtocolo);
      return this.http.get<any>(`${this.atendimentoUrl}/pesquisar-protocolo?`, { params })
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data.atendimentoDto;
       });
    }

    atualizar(atendimento: Atendimento): Promise<Atendimento> {
      return this.http.put<Atendimento>(`${this.atendimentoUrl}/${atendimento.id}`, atendimento)
        .toPromise()
        .then(response => {
          return response;
        });
    }

    concluir(atendimentoConclusao: AtendimentoConclusao): Promise<any> {
      return this.http.put<Atendimento>(`${this.atendimentoUrl}/concluir-atendimento`, atendimentoConclusao)
        .toPromise()
        .then(response => {
          return response;
        });
    }

    adicionar(atendimento: Atendimento): Promise<Atendimento> {
      this.user = this.sessionService.getItem("currentUser");
      atendimento.orgao = this.user.orgao;

      return this.http.post<Atendimento>(`${this.atendimentoUrl}`, atendimento)
        .toPromise();
    }

    excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.atendimentoUrl}/${codigo}`)  
        .toPromise()
        .then(() => null);
    }

    reabrir(atendimento: Atendimento): Promise<any> {
      return this.http.put<Atendimento>(`${this.atendimentoUrl}/reabrir-atendimento`, atendimento)  
        .toPromise()
        .then(response => {
          return response;
        });
    }


    cancelar(codigo: number): Promise<void> {
      return this.http.delete(`${this.atendimentoUrl}/cancelar/${codigo}`)
        .toPromise()
        .then(() => null);
    }

    listaNovosAtendimentos(filtro: PaginacaoPainel): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    return this.http.get(`${this.atendimentoUrl}/novos-atendimentos?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
          const resultado = {
            atendimentos: data.atendimentoDtoList,
            total: data.atendimentoDtoList.totalElements
          };

           return resultado;
     });
    }

    listaAtendimentosClassificadosNaoEncaminhados(filtro: PaginacaoPainel): Promise<any> {
      let params = new HttpParams()
      this.user = this.sessionService.getItem("currentUser");
      params = params.set('orgao', this.user.orgao.toString());
      params = params.set('page', filtro.pagina.toString());
      params = params.set('size', filtro.itensPorPagina.toString());
  
      return this.http.get(`${this.atendimentoUrl}/atendimentos-classificados-nao-enc?`,{ params })
           .toPromise()
           .then(res => <any>res)
           .then(data => {
            const resultado = {
              atendimentos: data.atendimentoDtoList,
              total: data.atendimentoDtoList.totalElements
            };
  
             return resultado;
       });
      }

  listaEncaminhamentosRecebidos(filtro: PaginacaoPainel): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    return this.http.get(`${this.atendimentoUrl}/atendimentos-recebidos?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
          const resultado = {
            atendimentos: data.modeloListaAtendimentosRecebidos,
            total: data.modeloListaAtendimentosRecebidos.totalElements
          };

           return resultado;
     });
    }

    historicoUsuario(codigoAtendimento: number): Promise<any> {
    let params = new HttpParams()
    params = params.set('codigoAtendimento', codigoAtendimento.toString());

    return this.http.get(`${this.atendimentoUrl}/historico-usuario?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data.historicoManifestanteDtoList;
     });
    }

    historicoAtendimento(codigoAtendimento: number): Promise<any> {
      let params = new HttpParams()
      params = params.set('codigoAtendimento', codigoAtendimento.toString());
  
      return this.http.get(`${this.logUrl}/historico-atendimento?`,{ params })
           .toPromise()
           .then(res => <any>res)
           .then(data => {
             return data.logAtendimentoDtoList;
       });
      }

      qtdAtendimentosPainelOuv(ano: any): Promise<any> {
        let params = new HttpParams()
        this.user = this.sessionService.getItem("currentUser");
        params = params.set('orgao', this.user.orgao.toString());
        params = params.set('ano', ano);
    
        return this.http.get(`${this.atendimentoUrl}/totalAtendimentosPainelOuv?`,{ params })
             .toPromise()
             .then(res => <any>res)
             .then(data => {
               return data;
         });
        }      
  

}
