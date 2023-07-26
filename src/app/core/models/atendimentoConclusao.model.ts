import { User } from "./user.model";

export class AtendimentoConclusao {
  atendimento: number;
  email: string;
  textoProvidencia: string;
  usuario = new User();
  formaResposta: number;
  modeloDocumento: number;
  selectedAnexos: any[] = [];
}
