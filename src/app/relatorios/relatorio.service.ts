import { AtendimentoArea } from './../core/models/relatorios/atendimento-area.model';
import { User } from 'src/app/core/models/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SessionService } from 'src/app/core/services/session.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Paginacao } from './atendimento-natureza/lista-detalhe/lista-detalhe.component';
import { RelatorioGeral } from '../core/models/relatorio-geral.model';



export class RelatorioFiltro {
  dataInicial!: any;
  dataFinal!: any;
  area!: any;
  status!: any;
  tipoGrafico!: any;
  usuario!: any;
  dataInicialAnterior!: any;
  dataFinalAnterior!: any;
  natureza!: any;
  assunto!: any;
  resolutividade!: any;
  prazoVencido = false;
  prazoVencer = false;
  prazo!: any;
  despacho15diasatras = false;
  pagina = 0;
  itensPorPagina = 5;
  nomeAtendente!: string;
  todasAreas!: any;
  concluidas = false;
  encaminhadas = false;
  respostasParcial = false;
  despacho = false;
  alteradas = false;
  orgao: number;
}

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  relatorioUrl: string;

  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,

  ) {
    this.relatorioUrl = `${environment.apiUrl}/relatorio`;
  }

  pesquisarPeriodo(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get(`${this.relatorioUrl}/atendimento-periodo?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;
      });
  }

  pesquisarGeral(relatorioGeral: RelatorioGeral): Promise<any> {
    this.user = this.sessionService.getItem("currentUser");
    relatorioGeral.orgao = this.user.orgao;
    return this.http.post<RelatorioGeral>(`${this.relatorioUrl}/atendimento-geral`, relatorioGeral)
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        const resultado = {
          atendimentos: data.listaDadosGeral,
          colunas: data.colunas
        };
         return resultado;
      });
  }


  pesquisarUsuario(filtro: RelatorioFiltro): Promise<any> {
    
    this.user = this.sessionService.getItem("currentUser");
    filtro.orgao = this.user.orgao;

    return this.http.post(`${this.relatorioUrl}/atendimento-usuario`, filtro)
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        const resultado = {
          nome: data.nome,
          lista: data.lista
        };
        return resultado;
      });
  }

  pesquisarProdutividadeCallCenter(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('area', filtro.area);

    return this.http.get(`${this.relatorioUrl}/produtividade-callcenter?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        const resultado = {
          nome: data.area,
          lista: data.lista
        };
        return resultado;
      });
  }

  pesquisarNatureza(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get(`${this.relatorioUrl}/atendimento-natureza?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;
      });
  }

  pesquisarPriorizacao(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get(`${this.relatorioUrl}/atendimento-priorizacao?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;
      });
  }

  pesquisarOrigem(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get(`${this.relatorioUrl}/atendimento-origem?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;
      });
  }

  pesquisarEstatisticaSatisfacao(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('area', filtro.area.toString());

    console.log(params);

    return this.http.get(`${this.relatorioUrl}/estatistica-satisfacao?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;
      });
  }

  pesquisarTipoManifestante(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get(`${this.relatorioUrl}/atendimento-tipo-manifestante?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;
      });
  }
  pesquisarAreaAssunto(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get(`${this.relatorioUrl}/atendimento-area-assunto?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;
      });
  }

  pesquisarMediaResposta(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get(`${this.relatorioUrl}/atendimento-media-resposta?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;
      });
  }

  pesquisarSecretaria(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial.toLocaleDateString());
    params = params.set('dataFinal', filtro.dataFinal.toLocaleDateString());
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('area', filtro.area.toString());

    return this.http.get(`${this.relatorioUrl}/atendimento-secretaria?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        const resultado = {
          descricaoArea: data.area,
          listaResolutividade: data.listaResolutividade,
          listaNatureza: data.listaNatureza,
          listaAssunto: data.listaAssunto
        };

        return resultado;

      });
  }

  pesquisarEficienciaOuvidoria(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get(`${this.relatorioUrl}/eficiencia-ouvidoria?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;

      });
  }

  pesquisarComparativoPeriodo(filtro: RelatorioFiltro): Promise<any> {

    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('dataInicialAnterior', filtro.dataInicialAnterior);
    params = params.set('dataFinalAnterior', filtro.dataFinalAnterior);
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get(`${this.relatorioUrl}/comparativo-periodo?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        const resultado = {
          listaManifestacoes: data.listaManifestacoes,
          listaNaturezaPeriodo1: data.listaNaturezaPeriodo1,
          listaNaturezaPeriodo2: data.listaNaturezaPeriodo2
        };
        return resultado;
      });

  }

  pesquisarSecretariaNatureza(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('area', filtro.area.toString());

    return this.http.get(`${this.relatorioUrl}/atendimento-secretaria-natureza?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        const resultado = {
          descricaoArea: data.area,
          listaResolutividade: data.listaResolutividade,
          listaNatureza: data.listaNatureza,
          listaAssunto: data.listaAssunto
        };
        return resultado;
      });
  }

  pesquisarAssunto(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('assunto', filtro.assunto);

    return this.http.get(`${this.relatorioUrl}/atendimento-assunto?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;
      });
  }

  pesquisarGraficoNatureza(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get(`${this.relatorioUrl}/graficoNatureza?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data.label;
      });
  }


  pesquisar(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('area', filtro.area != null ? filtro.area : '');
    params = params.set('status', filtro.status != null ? filtro.status : '');


    return this.http.get(`${this.relatorioUrl}/atendimento-area?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;
      });
  }

  pesquisarEncaminhamento(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('area', filtro.area != null ? filtro.area : '');
    params = params.set('status', filtro.status != null ? filtro.status : '');


    return this.http.get(`${this.relatorioUrl}/encaminhamento-setor?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;
      });
  }  


  atendimentoAreaPDF(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('area', filtro.area != null ? filtro.area : '');
    params = params.set('status', filtro.status != null ? filtro.status : '');

    return this.http.get<Blob>(`${this.relatorioUrl}/atendimento-area/impressao`, { params, responseType: 'blob' as 'json' })
      .toPromise().then((response) => {
        return response;
      })
  }

  encaminhamentoSetorPDF(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('area', filtro.area != null ? filtro.area : '');
    params = params.set('status', filtro.status != null ? filtro.status : '');

    return this.http.get<Blob>(`${this.relatorioUrl}/encaminhamento-setor/impressao`, { params, responseType: 'blob' as 'json' })
      .toPromise().then((response) => {
        return response;
      })
  }


  atendimentoPeriodo(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get<Blob>(`${this.relatorioUrl}/atendimento-periodo/impressao`, { params, responseType: 'blob' as 'json' })
      .toPromise().then((response) => {
        return response;
      })
  }

  atendimentoUsuario(filtro: RelatorioFiltro): Promise<any> {
    this.user = this.sessionService.getItem("currentUser");
    filtro.orgao = this.user.orgao;

    return this.http.post<Blob>(`${this.relatorioUrl}/atendimento-usuario/impressao`, filtro, {responseType: 'blob' as 'json' })
      .toPromise().then((response) => {
        return response;
      })
  }

  relatorioAtendimento(idAtendimento: number): Promise<any> {
    let params = new HttpParams()
    params = params.set('idAtendimento', idAtendimento.toString());

    return this.http.get<Blob>(`${this.relatorioUrl}/atendimento`, { params, responseType: 'blob' as 'json' })
      .toPromise().then((response) => {
        return response;
      })
  }

  listaDetalhe(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    if (filtro.area !== 0){
      params = params.set('area', filtro.area);
    }
    params = params.set('natureza', filtro.natureza);

    return this.http.get(`${this.relatorioUrl}/atendimento-natureza-detalhe?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;
      });
  }

  listaDetalheProdutividade(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('area', filtro.area);
    params = params.set('codigoUsuario', filtro.usuario);

    return this.http.get(`${this.relatorioUrl}/detalhe-produtividade-callcenter?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;
      });
  }

  listaDetalheAssunto(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('area', filtro.area);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('assunto', filtro.assunto.toString());

    return this.http.get(`${this.relatorioUrl}/atendimento-assunto-detalhe?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;
      });
  }

  listaDetalheAssuntoAgrupado(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('assunto', filtro.assunto);

    return this.http.get(`${this.relatorioUrl}/atendimento-assunto-agrupado-detalhe?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;
      });
  }


  listaDetalheResolutividade(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('area', filtro.area);
    params = params.set('resolutividade', filtro.resolutividade);


    return this.http.get(`${this.relatorioUrl}/atendimento-resolutividade-detalhe?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;
      });
  }

}
