import { User } from './user.model';
export class Encaminhamento {
  id: number;
  atendimento: number;
  setorOrigem: number;
  setorDestino:  number;
  modeloDocumento: any;
  despacho = '';
  dataEncaminhamento: Date;
  emailEnviado: string;
  usuario = new User();
  copiaEmailDirigente = false;
  dataPrazo: Date;
  diasUteisResposta: number;
  status: string;
  tokenSetor: string;
  setoresDestino: any;
  tipo: string;
  sequencial: number;
  selectedAnexos: any[] = [];
  enviarRespostaParcial: boolean;
  descricaoSetorOrigem: string;
  descricaoSetorDestino: string;
  anexoEnviado: number;
}


