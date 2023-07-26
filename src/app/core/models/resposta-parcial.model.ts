import { FormaResposta } from './forma-resposta.model';
import { User } from './user.model';
export class RespostaParcial {
  id: number;
  atendimento: number;
  modeloDocumento: any;
  descricao = '';
  dataResposta: Date;
  emailEnviado: string;
  usuario = new User();
  formaEnvio: number;
  status: number;
  descricaoRespostaHTML: string;
  orgao: number;
  descricaoFormaEnvio: string;
  selectedAnexos: any[] = [];
}


