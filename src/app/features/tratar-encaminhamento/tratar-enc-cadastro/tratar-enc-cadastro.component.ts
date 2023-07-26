import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { SessionService } from 'src/app/core/services/session.service';
import { EncaminhamentoService } from '../../atendimento/encaminhamento/encaminhamento.service';
import { AtendimentoService } from '../../atendimento/atendimento.service';
import { Atendimento } from 'src/app/core/models/atendimento.model';
import { UserDataService } from '../../seguranca/user-data.service';
import { AnexoService } from '../../atendimento/anexo/anexo.service';
import { Anexo } from 'src/app/core/models/anexo.model';
import { RespostaEncaminhamento } from 'src/app/core/models/resposta-encaminhamento.model';
import { EncaminhamentoRespostaService } from '../../atendimento/encaminhamento/encaminhamento-resposta.service';

@Component({
  selector: 'app-tratar-enc-cadastro',
  templateUrl: './tratar-enc-cadastro.component.html',
  styleUrls: ['./tratar-enc-cadastro.component.css']
})
export class TratarEncCadastroComponent implements OnInit {

  showLoaderDialog = false;
  atendimento = new Atendimento();
  permissoes!: any;
  displayModalResponder = false;
  resposta!: any;
  anexo = new Anexo();
  uploadedFiles: any[] = [];
  respostaEncaminhamento = new RespostaEncaminhamento();
  modeloo!: any;
  desabilitaBotao = false;
  data = new Date();
  


  constructor(
    private errorHandler: ErrorHandlerService,
    private encaminhamentoRespostaService: EncaminhamentoRespostaService,
    private anexoService: AnexoService,
    private atendimentoService: AtendimentoService,
    private messageService: MessageService,
    private sessionService: SessionService,
    private userDataService: UserDataService,
    private routeStateService: RouteStateService,
    private loaderService: LoaderService

  ) { }

  ngOnInit(): void {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoaderDialog = val;
    });
    this.permissoes = this.userDataService.permissoesUsuario();
    var routeState = this.routeStateService.getCurrent();
    if (routeState.data > 0) {
      this.respostaEncaminhamento.codigoEncaminhamento = routeState.data;
      this.buscaAtendimento(routeState.data);
    }
}

buscaAtendimento(codigo: number) {
  this.loaderService.show();
  this.atendimentoService.buscarAtendimento(codigo)
    .then(resultado => {
      this.atendimento = resultado;
    }
    ).then(() =>{
      this.loaderService.hide();
    })
    .catch(erro => {
      this.loaderService.hide();
      this.errorHandler.handle(erro);
    })
}

download(nomeArquivo: string){
  this.loaderService.show();
  this.anexoService
  .download(nomeArquivo)
  .then((response) => {
    const file = new Blob([response], { type: response.type });
    var url = URL.createObjectURL(file);
    this.loaderService.hide();
    window.open(url);
  })
  .catch((erro) => {
    this.loaderService.hide();
    this.errorHandler.handle(erro);
  });
}

responder(){
  this.loaderService.show();
    this.encaminhamentoRespostaService.enviarResposta(this.respostaEncaminhamento)
      .then()
      .then(() => {
        setTimeout(() => {
          this.loaderService.hide();
          this.messageService.add({ severity: 'success', detail: 'Encaminhamento respondido com sucesso!' });
          this.displayModalResponder = false;
          this.desabilitaBotao = true;
            }, 200);
      })
      .catch(erro => {
         setTimeout(() => {
          this.loaderService.hide();
          this.errorHandler.handle(erro);
            }, 1000);
      });
}

showResponder(){
  this.displayModalResponder = true;
}

onVoltar(){
  this.routeStateService.add('',
  '/main/tratar-encaminhamento/tratar-enc-pesquisa', null, false);
}

onCloseResponder(){
  this.displayModalResponder = false;
}

 /**
   * Convert File To Base64
   */
  convertFileToBase64(
    file: File,
    index: number,
    event: { target: { files: File[] }; files: any }
  ) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let anexo = new Anexo();
      anexo.stringBase64 = reader.result as string;
      anexo.nomeArquivo = file.name;
      this.respostaEncaminhamento.listaAnexoDto[index] = anexo;
    };
  }

  carregaArquivo(event: { target: { files: File[] }; files: any }) {
    for (let index = 0; index < event.files.length; index++) {
      const file: File = event.files[index];
      if (file) {
        this.convertFileToBase64(file, index, event);
      }
    }
  }


}