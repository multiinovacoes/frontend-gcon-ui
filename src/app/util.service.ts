import { ErrorHandlerService } from './core/services/error-handler.service';
import { ModeloDocumentoService } from './features/modelo-documento/modelo-documento.service';
import { Atendimento } from './core/models/atendimento.model';
import { Injectable } from '@angular/core';




import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private modeloDocumentoService: ModeloDocumentoService,
    private errorHandler: ErrorHandlerService
  ) { }
  prioridadesPadrao = [];
  tiposGrafico = [];
  tiposResposta = [];
  ufs = [];
  tipoModelo = [];
  statusManifestacao = [];
  statusEncaminhamento = [];
  anos = [];
  meses = [];
  


  listaStatusManifestacao(): any[]{
    this.statusManifestacao = [
      { label: 'Selecione a opção', value: '' },
      { label: 'Manifestação não concluídas', value: 0 },
      { label: 'Manifestações concluídas', value: 1 }
    ];
    return this.statusManifestacao;
  }

  listaStatusEncaminhamento(): any[]{
    this.statusEncaminhamento = [
      { label: 'Encaminhamento no prazo', value: 2 },
      { label: 'Encaminhamento vencido', value: 1 }
    ];
    return this.statusEncaminhamento;
  }


  listaMeioComunicacaoRespostapesquisa(): any[]{
    this.prioridadesPadrao = [
      { label: 'Site', value: 1 },
      { label: '0800', value: 2 },
      { label: 'Email', value: 3 }
    ];
    return this.prioridadesPadrao;
  }

  listaPrioridades(): any[]{
    this.prioridadesPadrao = [
      { label: 'NÃO CLASSIFICADO', value: 0 },
      { label: 'Alta', value: 1 },
      { label: 'Média', value: 2 },
      { label: 'Baixa', value: 3 }
    ];
    return this.prioridadesPadrao;
  }

  listaTiposGrafico(): any[]{
    this.tiposGrafico = [
      { label: 'Área', value: 'area2d' },
      { label: 'Barras Horizontais', value: 'bar3d' },
      { label: 'Barras Verticais', value: 'column3d' },
      { label: 'Pizza', value: 'pie3d' }
    ];
    return this.tiposGrafico;
  }

  listaUfs(): any[]{
    this.ufs = [
      { label: 'Acre', value: 'AC'},
      { label: 'Alagoas', value: 'AL'},
      { label: 'Amazonas', value: 'AM'},
      { label: 'Amapá', value: 'AP'},
      { label: 'Bahia', value: 'BA'},
      { label: 'Ceará', value: 'CE'},
      { label: 'Distrito Federal', value: 'DF'},
      { label: 'Espírito Santo', value: 'ES'},
      { label: 'Goias', value: 'GO'},
      { label: 'Maranhão', value: 'MA'},
      { label: 'Minas Gerais', value: 'MG'},
      { label: 'Mato Grosso do Sul', value: 'MS'},
      { label: 'Mato Grosso', value: 'MT'},
      { label: 'Pará', value: 'PA'},
      { label: 'Paraíba', value: 'PB'},
      { label: 'Pernambuco', value: 'PE'},
      { label: 'Piaui', value: 'PI'},
      { label: 'Paraná', value: 'PR'},
      { label: 'Rio de Janeiro', value: 'RJ'},
      { label: 'Rio Grande do Norte', value: 'RN'},
      { label: 'Rondônia', value: 'RO'},
      { label: 'Rio Grande do Sul', value: 'RS'},
      { label: 'Santa Catarina', value: 'SC'},
      { label: 'Sergipe', value: 'SE'},
      { label: 'São Paulo', value: 'SP'},
      { label: 'Tocantins', value: 'TO'},
      { label: 'Roraima', value: 'RR'}
    ];
    return this.ufs;
  }

  listaTipoModelo(): any[]{
    this.tipoModelo = [
      { label: 'Modelo Encaminhamento', value: 1 },
      { label: 'Modelo Despacho', value: 2 },
      { label: 'Modelo Resposta', value: 3 },
      { label: 'Modelo Convite', value: 4 },
      { label: 'Modelo Executores', value: 5 },
      { label: 'Modelo Carta', value: 6 }
    ];
    return this.tipoModelo;
  }

  listaEstadoCivil(): any[]{
    this.tipoModelo = [
      { label: 'Solteiro', value: 1 },
      { label: 'Casado', value: 2 },
      { label: 'Viuvo', value: 3 },
      { label: 'Divorciado', value: 4 }
    ];
    return this.tipoModelo;
  }

  listaAnos(): any[]{
    this.anos = [
      { label: '2015', value: 2015 },
      { label: '2016', value: 2016 },
      { label: '2017', value: 2017 },
      { label: '2018', value: 2018 },
      { label: '2019', value: 2019 },
      { label: '2020', value: 2020 },
      { label: '2021', value: 2021 },
      { label: '2022', value: 2022 },
      { label: '2023', value: 2023 }
    ];
    return this.anos;
  }

  listaMeses(): any[]{
    this.meses = [
      { label: 'JANEIRO', value: 1 },
      { label: 'FEVEREIRO', value: 2 },
      { label: 'MARÇO', value: 3 },
      { label: 'ABRIL', value: 4 },
      { label: 'MAIO', value: 5 },
      { label: 'JUNHO', value: 6 },
      { label: 'JULHO', value: 7 },
      { label: 'AGOSTO', value: 8 },
      { label: 'SETEMBRO', value: 9 },
      { label: 'OUTUBRO', value: 10 },
      { label: 'NOVEMBRO', value: 11 },
      { label: 'DEZEMBRO', value: 12 }
    ];
    return this.meses;
  }

  listaFormaEnvioResposta(): any[]{
    this.tiposResposta = [
      { label: 'Não informado', value: 0 },
//      { label: 'Carta', value: 1 },
      { label: 'Email', value: 2 },
      { label: 'Telefone', value: 4 },
      { label: 'Presencial', value: 5 }

    ];
    return this.tiposResposta;
  }

  public descricaoTipoResposta(codigo: number): string{
    if (codigo == 1)
      return "Carta";
    else if (codigo == 2)
      return "Email";
    else if (codigo == 4)
      return "Telefone";
    else if (codigo == 5)
      return "Presencial";
    else
    return "";
  }

  public converterStringsParaDatas(data: string): Date {
    return moment(data,
      'YYYY-MM-DD').toDate();
  }

  public formataData(data: Date): string {
    return moment(data, "YYYY-MM-DD").format('DD/MM/YYYY');
  }




}
