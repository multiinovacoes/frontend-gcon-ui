import { TipoDocumento } from './tipo-documento.model';
import { TipoManifestante } from './tipo-manifestante.model';
import { Area } from './area.model';
import { Orgao } from 'src/app/core/models/orgao.model';
import { Natureza } from './natureza.model';
import { User } from "./user.model";
import { Assunto } from './assunto.model';
import { OrigemManifestacao } from './origem-manifestacao.model';

export class Atendimento {
  id: number;
  descricao: string;
  status: number;
  orgao: number;
  numeroAtendimento: string;
  numeroProtocolo: string;
  anoAtendimento: string;
  manterSigilo: number;
  tipoUsuario: number;
  nomeSolicitante: string;
  tipoDocumento: number;
  numeroDocumento: string;
  dataNascimento: Date;
  estadoCivil: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  uf: string;
  bairro: string;
  municipio: string;
  email: string;
  dddFone: string;
  fone: string;
  dddCelular: string;
  foneCelular: string;
  dataEntrada: Date;
  origemManifestacao: any;
  setor: any;
  usuarioCriacao: number;
  dataCriacao: Date;
  usuarioAlteracao: any;
  dataAlteracao: Date;
  tempoDuracaoAtendimento: string;
  dataPrazo: any;
  dataPrazoPrevisto: any;
  descricaoOque: string;
  descricaoComo: string;
  descricaoOnde: any;
  descricaoQuem: string;
  descricaoQuando: string;
  area: number;
  assunto: number;
  natureza: number;
  priorizacao: number;
  justificativaProrrogacao: string;
  statusAtendimento: number;
  resposta: string;
  observacao: string;
  dataConclusao: Date;
  satisfaz: number;
  descricaoFatos: string;
  dataQuando: string;
  sequencialOrgao: number;
  protocoloOrigem: string;
  complementoDescricao: string;
  modoResposta: number;
  codigoAcesso: string;
  situacao: string;
  manifestante: any;
  modeloDocumento: any;
  qtdDiasprorrogar: number;
  codigoAtendimentoResposta: number;
  dataProrroga: Date;
  nomeUsuarioCriacao: string;
  atendimentoDto: Atendimento;
  assuntoId: number;
  dataNasci = '';
  codigoBairroOcorrencia: any;
  codigoInstituicao: any;
  sigilo = false;
  camposDesabilitados: any;
  manifestacaoClassificada: any;
  manifestacaoConcluida: any;
  descricaoAssunto: string;
  descricaoUsuario: string;
  descricaoUsuarioAlteracao: string;
  qtdAnexos: number;
  qtdHistoricoUsuario: number;
  senhaManifestante: string;
  descricaoArea: string;
  descricaoPrioridade: string;
  descricaoNatureza: string;
  descricaoOrigem: string;
  descricaoStatus: string;
  dadosEncaminhamento: string;
  textoEncaminhamento: string;
  anexos!: any;
  meioComunicacaoRespPesquisa!: number;
  listaAnexoDto: any[] = [];
}
