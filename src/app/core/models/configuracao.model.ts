export class Configuracao {
  id: number;
  qtdDiasVencer: number;
  qtdDiasDesvioAtendimento: number;
  qtdDiasDesvioEncaminhamento: number
  qtdDiasDesvioMarco: number
  qtdDiasEncaminhamento: number
  qtdDiasResposta: number
  qtdDiasAlertaMarco: number
  qtdDiasAlertaEncaminhamento: number
  qtdDiasExibirAtendimentosEnviados: number
  qtdIntervaloDiasEmail: number
  orgao: any;
  manterSigilo: boolean;
  formaAtendimento: number;
  prioridadePadrao: number;
  exibirDetalheEncaminhamento: boolean;
  enviarRespostaParcial: boolean;
  respostaParcialPadrao: number;
  numeroDiasProrrogarAtendimento: number;
  respostaParcialPadraoProrrogacao: number;
}
