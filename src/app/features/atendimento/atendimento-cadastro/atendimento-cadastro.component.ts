import { RelatorioService } from './../../../relatorios/relatorio.service';
import { AnexoService } from "./../anexo/anexo.service";
import { AnexoComponent } from "./../anexo/anexo.component";
import { HttpClient } from "@angular/common/http";
import { AtendimentoConclusaoComponent } from "./../atendimento-conclusao/atendimento-conclusao.component";
import { ConfirmationService, MessageService } from "primeng/api";
import { User } from "src/app/core/models/user.model";
import { BairroService } from "./../../bairro/bairro.service";
import { InstituicaoService } from "./../../instituicao/instituicao.service";
import { LoaderService } from "src/app/core/services/loader.service";
import { FormaRespostaService } from "./../../forma-resposta/forma-resposta.service";
import { DespachoService } from "./../despacho/despacho.service";
import { DespachoComponent } from "./../despacho/despacho.component";
import { RespostaParcialService } from "./../resposta-parcial/resposta-parcial.service";
import { RespostaParcialComponent } from "./../resposta-parcial/resposta-parcial.component";
import { RespostaManualComponent } from "./../resposta-manual/resposta-manual.component";
import { EncaminhamentoService } from "./../encaminhamento/encaminhamento.service";
import { SessionService } from "src/app/core/services/session.service";
import { NaturezaService } from "./../../natureza/natureza.service";
import { AssuntoService } from "./../../assunto/assunto.service";
import { AreaService } from "./../../area/area.service";
import { OrigemManifestacaoService } from "./../../origem-manifestacao/origem-manifestacao.service";
import { TipoDocumentoService } from "./../../tipo-documento/tipo-documento.service";
import { TipoManifestanteService } from "./../../tipo-manifestante/tipo-manifestante.service";
import { UtilService } from "./../../../util.service";
import { AtendimentoService } from "./../atendimento.service";
import { Atendimento } from "./../../../core/models/atendimento.model";
import { Component, OnInit, ViewChild, ChangeDetectorRef, SimpleChanges } from "@angular/core";
import { RouteStateService } from "src/app/core/services/route-state.service";
import { ErrorHandlerService } from "src/app/core/services/error-handler.service";
import { NgForm } from "@angular/forms";

import { EditorModule } from "primeng/editor";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Assunto } from "src/app/core/models/assunto.model";

import Swal from "sweetalert2/dist/sweetalert2.js";

import * as moment from "moment";
import { EncaminhamentoComponent } from "../encaminhamento/encaminhamento.component";

import { cpf } from "cpf-cnpj-validator";
import { UserDataService } from 'src/app/features/seguranca/user-data.service'; 
import { PesquisaSatisfacao } from 'src/app/core/models/pesquisa-satisfacao.model';
import { PesquisaSatisfacaoAtendimento } from 'src/app/core/models/pesquisa-satisfacao-atendimento.model';

@Component({
  selector: "app-atendimento-cadastro",
  templateUrl: "atendimento-cadastro.component.html",
  styleUrls: ["atendimento-cadastro.component.css"],
})
export class AtendimentoCadastroComponent implements OnInit {
  atendimento = new Atendimento();
  showLoaderDialog = false;
  displayModalHistoricoUsuario!: boolean;
  displayModalHistoricoAtendimento!: boolean;
  displayModalHistoricoObservacao!: boolean;
  historicoUsuario!: any;
  historicoAtendimento!: any;
  public Editor = ClassicEditor;
  cpfInvalido: boolean;
  user: User;
  tipoDocumentos!: any;
  estadosCivil = [];
  pesquisaSatisfacao = [];
  displayModalHistoricoPesquisaSatisfacao!: boolean;
  pesquisaSatisfacaoAtendimento = new PesquisaSatisfacaoAtendimento();
  ufs = [];
  bairros = [];
  origensManifestacao!: any;
  tipoUsuarios!: any;
  areas!: any;
  instituicoes!: any;
  assuntos!: any;
  naturezas!: any;
  prioridades!: any;
  meioComunicacaoRespPesquisa!: any;
  formasResposta!: any;
  permissoes!: any;
  abaDisabled = false;
  assuntoId = 0;
  index = 0;
  dataAtual: Date = new Date();
  dataAtualISO = this.dataAtual;
  encaminhamentos = [];
  respostasParciais!: any;
  despachos!: any;
  anexos!: any;
  desabilitaTipoUsuario = false;
  idEncaminhamentoSelecao: any;
  idRespostaParcialSelecao: any;
  idDespachoSelecao: any;
  @ViewChild(EncaminhamentoComponent)
  encaminhamentoComponent: EncaminhamentoComponent;
  @ViewChild(RespostaManualComponent)
  respostaManualComponent: RespostaManualComponent;
  @ViewChild(RespostaParcialComponent)
  respostaParcialComponent: RespostaParcialComponent;
  @ViewChild(DespachoComponent) despachoComponent: DespachoComponent;
  @ViewChild(AtendimentoConclusaoComponent)
  atendimentoConclusaoComponent: AtendimentoConclusaoComponent;
  @ViewChild(AnexoComponent)
  anexoComponent: AnexoComponent;
  @ViewChild("myFormHistoricoUsuario", { static: false }) myFormHistoricoUsuario: NgForm;
  @ViewChild("myFormHistoricoAtendimento", { static: false }) myFormHistoricoAtendimento: NgForm;
  @ViewChild("myFormHistoricoObservacoes", { static: false }) myFormHistoricoObservacoes: NgForm;


  constructor(
    private cdref: ChangeDetectorRef,
    private atendimentoService: AtendimentoService,
    private messageService: MessageService,
    private utilService: UtilService,
    private areaService: AreaService,
    private sessionService: SessionService,
    private confirmation: ConfirmationService,
    private assuntoService: AssuntoService,
    private userDataService: UserDataService,
    private loaderService: LoaderService,
    private formaRespostaService: FormaRespostaService,
    private naturezaService: NaturezaService,
    private despachoService: DespachoService,
    private respostaParcialService: RespostaParcialService,
    private encaminhamentoService: EncaminhamentoService,
    private origemManifestacaoService: OrigemManifestacaoService,
    private tipoDocumentoService: TipoDocumentoService,
    private tipoManifestanteService: TipoManifestanteService,
    private instituicaoService: InstituicaoService,
    private bairroService: BairroService,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient,
    private anexoService: AnexoService,
    private routeStateService: RouteStateService,
    private relatorioService: RelatorioService
  ) {}

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  onCallParent() {
    this.index = 2;
    this.idEncaminhamentoSelecao = null;
    this.carregarEncaminhamentos();
    this.carregarRespostas();
  }


  onCallParentAnexo(){
    this.editarAtendimento(this.atendimento.id);
  }

  onCallParentIncluirAnexo(lista: any){
    this.atendimento.listaAnexoDto = lista;
  }

  onCallParentConclusao() {
    this.editarAtendimento(this.atendimento.id);
  }

  onCallParentDespacho() {
    this.index = 5;
    this.carregarDespachos();
  }

  onCallParentRespostaParcial() {
    this.index = 3;
    this.carregarRespostas();
  }

  ngOnDestroy() {
    this.loaderService.status.observers.forEach(function (element) {
      element.complete();
    });
  }


  ngOnInit() {
    this.atendimento.tipoUsuario = 1;
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoaderDialog = val;
    });
    this.permissoes = this.userDataService.permissoesUsuario();
    this.ufs = this.utilService.listaUfs();
    this.estadosCivil = this.utilService.listaEstadoCivil();
    this.carregarTiposManifestantes();
    this.carregarTiposDocumento();
    this.carregarOrigensManifestante();
    this.carregarAreas();
    this.carregarInstituicoes();
    this.carregarNatureza();
    this.carregarFormaResposta();
    this.prioridades = this.utilService.listaPrioridades();
    this.meioComunicacaoRespPesquisa = this.utilService.listaMeioComunicacaoRespostapesquisa();
    var routeState = this.routeStateService.getCurrent();
    if (routeState.data > 0) {
      this.editarAtendimento(routeState.data);
      this.desabilitaTipoUsuario = true;
    } else {
      this.user = this.sessionService.getItem("currentUser");
      this.atendimento.dataEntrada = new Date();
      this.desabilitaTipoUsuario = false;
      this.abaDisabled = true;
      this.atendimento.manifestacaoClassificada = false;
      this.atendimento.dataCriacao = new Date();
      this.atendimento.descricaoUsuario = this.user.nome;
      this.atendimento.usuarioCriacao = this.user.id;
      this.atendimento.origemManifestacao = 11;
      this.atendimento.manifestacaoConcluida = false;
      this.atendimento.area = 0;
      this.atendimento.assunto = 0;
      this.atendimento.priorizacao = 0;
      this.atendimento.natureza = 0;
      this.atendimento.id = null;
      this.carregarAssunto();
    }
   
  }

  habilitaCampos(f: NgForm) {
    if (f.value.tipoUsuario == 0) {
      this.disabilitaCampos();
    } else {
      this.atendimento.nomeSolicitante = "";
      this.atendimento.camposDesabilitados = false;
    }
  }

  disabilitaCampos() {
    this.atendimento.tipoDocumento = null;
    this.atendimento.numeroDocumento = null;
    this.atendimento.dataNascimento = null;
    this.atendimento.dataNasci = null;
    this.atendimento.estadoCivil = null;
    this.atendimento.cep = null;
    this.atendimento.endereco = null;
    this.atendimento.complemento = null;
    this.atendimento.bairro = null;
    this.atendimento.municipio = null;
    this.atendimento.uf = null;
    this.atendimento.dddFone = null;
    this.atendimento.fone = null;
    this.atendimento.dddCelular = null;
    this.atendimento.foneCelular = null;
    this.atendimento.email = null;
    this.atendimento.protocoloOrigem = null;
    this.atendimento.tipoUsuario = 0;
    this.atendimento.dataEntrada = new Date();
    this.atendimento.nomeSolicitante = "Anonimo";
    this.atendimento.descricaoOque = null;
    this.atendimento.camposDesabilitados = true;
  }

  showDespacho() {
    this.despachoComponent.showDespacho(this.atendimento.id);
  }

  showObservacao(){
    this.displayModalHistoricoObservacao = true;
  }

  showConclusao() {
      this.atendimentoConclusaoComponent.showConclusao(this.atendimento.id, this.encaminhamentos == null ? false : this.encaminhamentos.length == 0 ? false : true);
  }


  reabrirAtendimento() {
    this.atendimentoService.reabrir(this.atendimento)
    .then((response) => {
      this.atendimento = response.atendimentoDto;
      this.messageService.add({ severity: 'success', detail: 'Atendimento reaberto com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  showAnexo() {
    this.anexoComponent.showAnexo(this.atendimento.id);
  }

  showPesquisaSatisfacao(){
    this.loaderService.show();
    this.atendimentoService.listaPesquisaSatisfacao()
    .then((response) => {
      this.pesquisaSatisfacao = response;
    })
    .then(() => {
      this.loaderService.hide();
      this.atendimento
      this.displayModalHistoricoPesquisaSatisfacao = true;
    })
    .catch((erro) => {
      this.loaderService.hide();
      this.errorHandler.handle(erro);
    });
  }

  responderPesquisaSatisfacao(form: NgForm){
    this.loaderService.show();
    this.pesquisaSatisfacaoAtendimento.idAtendimento = this.atendimento.id;
    this.pesquisaSatisfacaoAtendimento.listaPergunta = this.pesquisaSatisfacao;
    this.pesquisaSatisfacaoAtendimento.meioComunicacaoRespPesquisa = 2;
    this.atendimentoService.salvarPesquisaSatisfacao(this.pesquisaSatisfacaoAtendimento)
      .then(() => {
        this.loaderService.hide();
      })
      .then(() => {
        this.atendimento.satisfaz = 1;
        this.displayModalHistoricoPesquisaSatisfacao = false;
        setTimeout(() => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Pesquisa enviada com sucesso' });
        }, 1000);
      })
      .catch(erro => {
        this.loaderService.hide();
          setTimeout(() => {
            this.errorHandler.handle(erro);
          }, 1000);
        });
  }

  gerarRelatorio(id: number){
    this.loaderService.show();
    this.relatorioService
    .relatorioAtendimento(id)
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

 

  listaHistoricoUsuario() {
    this.myFormHistoricoUsuario.reset();
    this.carregarHistoricoUsuario();
    }

  listaHistoricoAtendimento() {
    this.myFormHistoricoAtendimento.reset();
    this.carregarHistoricoAtendimento();
  }

  carregarHistoricoUsuario() {
    this.loaderService.show();
    this.atendimentoService.historicoUsuario(this.atendimento.id).then((historicos) => {
      this.historicoUsuario = historicos;
    }).then(() => {
      this.loaderService.hide();
      this.displayModalHistoricoUsuario = true;
    })
    .catch((erro) => {
      this.loaderService.hide();
      this.errorHandler.handle(erro);
    });
  }




  carregarHistoricoAtendimento() {
    this.loaderService.show();
    this.atendimentoService.historicoAtendimento(this.atendimento.id).then((historicos) => {
      this.historicoAtendimento = historicos;
    }).then(() => {
      this.loaderService.hide();
      this.displayModalHistoricoAtendimento = true;
    })
    .catch(erro => {
      this.loaderService.hide();
      this.errorHandler.handle(erro);
    })
  }

 onClose() {
    this.displayModalHistoricoUsuario = false;
  }

  onClosePesquisaSatisfacao(){
    this.displayModalHistoricoPesquisaSatisfacao = false; 
  }

  onCloseHistoricoAtendimento() {
    this.displayModalHistoricoAtendimento = false;
  }

  onCloseHistoricoObservacao() {
    this.displayModalHistoricoObservacao = false;
  }


  showRespostaParcial() {
    this.respostaParcialComponent.showPositionDialog(
      this.atendimento.id,
      this.atendimento.email,
      this.atendimento.tipoUsuario
    );
  }

  showPosition() {
    this.encaminhamentoComponent.showPositionDialog(this.atendimento.id, this.atendimento.tipoUsuario);
  }

  showVisualizaDialog(codigoEncaminhamento: number) {
    this.encaminhamentoComponent.showVisualizaDialog(codigoEncaminhamento);
  }

  showRetornoManual(codigoEncaminhamento: number) {
    this.respostaManualComponent.showRetornoManual(codigoEncaminhamento);
  }

  showVisualizaResposta(codigoResposta: number) {
    this.respostaManualComponent.showVisualizaResposta(codigoResposta);
  }

  showCancela(codigoEncaminhamento: number) {
    this.encaminhamentoComponent.confirmarExclusao(codigoEncaminhamento);
  }

  showVisualizaRespostaParcial(codigoResposta: number) {
    this.respostaParcialComponent.showVisualizaDialog(codigoResposta);
  }

  showVisualizaDespacho(codigoDespacho: number) {
    this.despachoComponent.showVisualizaDialog(codigoDespacho);
  }

  showExcluir(codigoResposta: number) {
    this.respostaParcialComponent.confirmarExclusao(codigoResposta);
  }

  showExcluirDespacho(codigoDespacho: number) {
    this.despachoComponent.confirmarExclusao(codigoDespacho);
  }

  back() {
     this.routeStateService.add('Pesquisa de Atendimento',
      '/main/atendimento/atendimento-pesquisa', null, true);
  }

 

  editarAtendimento(codigo: number) {
    this.loaderService.show();
    this.displayModalHistoricoUsuario = false;
    this.atendimentoService
      .editar(codigo)
      .then((atendimento) => {
        this.atendimento = atendimento;
   
      }).then(res => {
        this.atendimento.manterSigilo == 0
        ? (this.atendimento.sigilo = false)
        : (this.atendimento.sigilo = true);
        this.carregarCamposEdicao();
        this.carregarEncaminhamentos();
        this.carregarRespostas();
        this.carregarDespachos();
        this.carregarAssunto();
        this.loaderService.hide();
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      })
  }

  carregarCamposEdicao() {
    if (this.atendimento.dataNasci == "31/12/1969")
      this.atendimento.dataNasci = "";
    if (this.atendimento.area != null)
      this.carregarAssunto();
    if (this.atendimento.tipoUsuario == 3) {
      this.disabilitaCampos();
    }
  }

  confirmarReabertura() {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja reabrir este atendimento?',
      accept: () => {
        this.reabrirAtendimento();
      }
    });
  }

  get editando() {
    return Boolean(this.atendimento.id);
  }

  carregarCamposInclusao() {
    this.atendimento.dataEntrada = new Date();
    this.atendimento.descricaoUsuario = this.sessionService.getItem("currentUser").nome;
    this.atendimento.dataCriacao = this.dataAtualISO;

    if (this.atendimento.area != null)
      this.carregarAssunto();
  }

  salvar(form: NgForm) {
 
    if (
      this.atendimento.dataNasci != null &&
      this.atendimento.dataNasci != ""
    ) {
      if (!this.validateDate(this.atendimento.dataNasci)) {
        Swal.fire(
          "Data de Nascimento inválida",
          "Informe uma data válida!",
          "warning"
        );
        return false;
      }
    }

    if (this.atendimento.tipoDocumento == 1) {
      if (!cpf.isValid(this.atendimento.numeroDocumento)) {
        Swal.fire("CPF Inválido", "Informe um cpf válido!", "warning");
        return false;
      }
    }

    this.atendimento.sigilo == false || this.atendimento.sigilo == null
      ? (this.atendimento.manterSigilo = 0)
      : (this.atendimento.manterSigilo = 1);
    form.value.dataNascimento = moment(form.value.dataNasci, "DD/MM/YYYY");
    this.atendimento.dataNascimento = form.value.dataNascimento;

    if (this.editando) {
      this.atualizarAtendimento();
    } else {
      this.adicionarAtendimento();
    }
    this.abaDisabled = false;
  }

  adicionarAtendimento() {
    this.loaderService.show();
    this.atendimentoService
      .adicionar(this.atendimento)
      .then((response) => {
        this.atendimento = response.atendimentoDto;
        this.atendimento.manterSigilo == 0
        ? (this.atendimento.sigilo = false)
        : (this.atendimento.sigilo = true);
        this.loaderService.hide();
        Swal.fire("Atendimento adicionado com sucesso", "Protocolo: " + this.atendimento.numeroProtocolo  + "      Senha do protocolo: " + this.atendimento.senhaManifestante, "success");
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }

  atualizarAtendimento() {
    this.loaderService.show();
    this.atendimentoService
      .atualizar(this.atendimento)
      .then((response) => {
        this.atendimento = response.atendimentoDto;
        this.atendimento.manterSigilo == 0
        ? (this.atendimento.sigilo = false)
        : (this.atendimento.sigilo = true);
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          detail: "Atendimento atualizado com sucesso!",
        });
      }).then( (res) => {
        this.displayModalHistoricoObservacao = false;
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }

  


  carregarEncaminhamentos() {
    this.encaminhamentoService.listar(this.atendimento.id).then((enc) => {
      this.encaminhamentos = enc;
    });
  }

  carregarRespostas() {
    this.respostaParcialService
      .listar(this.atendimento.id)
      .then((respostasParciais) => {
        this.respostasParciais = respostasParciais;
      });
  }

  carregarDespachos() {
    this.despachoService.listar(this.atendimento.id).then((despachos) => {
      this.despachos = despachos;
    });
  }

  carregarAnexos() {
    this.anexoService.listar(this.atendimento.id).then((anexos) => {
      this.anexos = anexos;
    });
  }

  carregarTiposManifestantes() {
    this.tipoManifestanteService
      .listar()
      .then((tipoUsuarios) => {
        this.tipoUsuarios = tipoUsuarios.map(
          (o: { descricao: any; id: any }) => ({
            label: o.descricao,
            value: o.id,
          })
        );
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarTiposDocumento() {
    this.tipoDocumentoService
      .listar()
      .then((tipoDocumentos) => {
        this.tipoDocumentos = tipoDocumentos.map(
          (o: { descricao: any; id: any }) => ({
            label: o.descricao,
            value: o.id,
          })
        );
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarOrigensManifestante() {
    this.origemManifestacaoService
      .listar()
      .then((origensManifestacao) => {
        this.origensManifestacao = origensManifestacao.map(
          (o: { descricao: any; id: any }) => ({
            label: o.descricao,
            value: o.id,
          })
        );
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarAreas() {
    this.areaService
      .listar()
      .then((areas) => {
        this.areas = areas.map((o: { descricao: any; id: any }) => ({
          label: o.descricao,
          value: o.id,
        }));
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarInstituicoes() {
    this.user = this.sessionService.getItem("currentUser");
    if (this.user.orgao != 2) {
      this.instituicaoService
        .listar()
        .then((instituicao) => {
          this.instituicoes = instituicao.map((o: { nome: any; id: any }) => ({
            label: o.nome,
            value: o.id,
          }));
        })
        .catch((erro) => this.errorHandler.handle(erro));
    } else {
      this.bairroService
        .listar()
        .then((bairro) => {
          this.instituicoes = bairro.map((o: { descricao: any; id: any }) => ({
            label: o.descricao,
            value: o.id,
          }));
        })
        .catch((erro) => this.errorHandler.handle(erro));
    }
  }

  carregarAssunto() {
    this.assuntoService
      .pesquisarAssunto(this.atendimento.area)
      .then((assuntos) => {
        this.assuntos = assuntos.map((o: { descricao: any; id: any }) => ({
          label: o.descricao,
          value: o.id,
        }));
      }).then(res => {
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarNatureza() {
    this.naturezaService
      .listar()
      .then((naturezas) => {
        this.naturezas = naturezas.map((o: { descricao: any; id: any }) => ({
          label: o.descricao,
          value: o.id,
        }));
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarFormaResposta() {
    this.formaRespostaService
      .listar()
      .then((formasResposta) => {
        this.formasResposta = formasResposta.map(
          (o: { descricao: any; id: any }) => ({
            label: o.descricao,
            value: o.id,
          })
        );
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  descricaoFormaEnvio(codigo: number): string {
    if (codigo == 1) {
      return "Carta";
    } else if (codigo == 2) {
      return "Email";
    } else if (codigo == 4) {
      return "Telefone";
    } else if (codigo == 5) {
      return "Presencial";
    } else {
      return "Não encontrado";
    }
  }


  escolherMascara() {}

  validateDate(data: any) {
    var regex = "\\d{2}/\\d{2}/\\d{4}";
    var dtArray = data.split("/");

    if (dtArray == null) return false;

    // Checks for dd/mm/yyyy format.
    var dtDay = dtArray[0];
    var dtMonth = dtArray[1];
    var dtYear = dtArray[2];

    if (dtMonth < 1 || dtMonth > 12) return false;
    else if (dtDay < 1 || dtDay > 31) return false;
    else if (
      (dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) &&
      dtDay == 31
    )
      return false;
    else if (dtMonth == 2) {
      var isleap = dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0);
      if (dtDay > 29 || (dtDay == 29 && !isleap)) return false;
    }
    return true;
  }

  buscar() {
    if (this.atendimento.cep != null) {
      if (this.atendimento.cep.length == 8) {
        return this.http
          .get(`https://viacep.com.br/ws/${this.atendimento.cep}/json/`)
          .toPromise()
          .then((res) => <any>res)
          .then((data) => {
            this.atendimento.cep = data.cep;
            this.atendimento.endereco = data.logradouro;
            //this.atendimento.complemento = data.complemento;
            this.atendimento.bairro = data.bairro;
            this.atendimento.municipio = data.localidade;
            this.atendimento.uf = data.uf;
            return data.logradouro;
          });
      }
    }

    return (this.atendimento.cep = "");
  }

  validaCpf() {
    if (this.atendimento.tipoDocumento == 1) {
      if (!cpf.isValid(this.atendimento.numeroDocumento)) {
        this.cpfInvalido = true;
        //Swal.fire('CPF Inválido', 'Informe um cpf válido!', 'warning');
      } else {
        this.cpfInvalido = false;
      }
    } else {
      this.cpfInvalido = false;
    }
  }
}
