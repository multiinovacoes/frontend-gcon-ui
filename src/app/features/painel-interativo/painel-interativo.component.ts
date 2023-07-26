import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';
import { AtendimentoService } from '../atendimento/atendimento.service';

import * as moment from 'moment'
import { User } from 'src/app/core/models/user.model';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-painel-interativo',
  templateUrl: './painel-interativo.component.html',
  styleUrls: ['./painel-interativo.component.css']
})
export class PainelInterativoComponent implements OnInit {

  dataSourceSecretaria = {};

  dataSourceNatureza = {};

  dataSourceAssunto = {};

  dataSourceSetorNatureza = {};

  dataSourceResolutividade = {};

  dataSourceAtendimentosAno = {};

  dataSourceAtendimentosOrigem = {};

  dataSourceAvaliacaoPesquisa = {};

  displayModalImpressao: boolean;
  
  ano = 0;

  barChartDataSecretaria: any;

  width = "100%";
  //height = "300";
  widthImpressao = "45%";

  chartDataSecretaria: any;

  chartDataAssunto: any;

  chartDataResolutividade: any;

  chartDataNatureza: any;

  chartDataAtendimentosAno: any;

  chartDataAtendimentosOrigem: any;

  chartDataAvaliacaoPesquisa: any;

  chartDataAtendimentosSetorNatureza: any;

  showLoaderDialogPainelInterativo = false;

  qtdAtendimentoAno: number;

  qtdAtendimentoAnoConcluidos: number;

  qtdAtendimentoAnoNaoConcluidos: number;
  qtdAtendimentoAnoTramitacaoNaoVencido: number;
  qtdAtendimentoAnoTramitacaoVencido: number;

  totalAtendimentosNovos: number;

  percentualResolvido: any;

  percentualTramitacao: any;

  data = new Date();
  user: User;


  constructor(
    private atendimentoService: AtendimentoService,
    private sessionService: SessionService,
    private loaderService: LoaderService
  ) { }

  ngOnDestroy() {
    this.loaderService.status.observers.forEach(function (element) {
      element.complete();
    });
  }
  ngOnInit(): void {

    this.user = this.sessionService.getItem("currentUser");
  
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoaderDialogPainelInterativo = val;
    });

    const data = moment();
    this.ano = data.year();
    this.displayModalImpressao = false;

  this.loaderService.show();
  this.qtdAtendimentosAno(this.ano);
  this.qtdAtendimentosNaturezas(this.ano);
  this.qtdAtendimentosSecretaria(0, this.ano);
  this.qtdAtendimentosAssunto(this.ano);
  this.qtdAtendimentosAnual(this.ano);
  this.qtdAvaliacaoPesquisa(this.ano);
  this.qtdAtendimentosOrigem(this.ano);
  this.qtdAtendimentosResolutividade(this.ano);
  this.qtdAtendimentosSetorNatureza(this.ano);

  }

  modalImpressao(){
    this.widthImpressao = "45%";
    this.data
    this.displayModalImpressao = true;
  }


  consultarPainel(){
    this.loaderService.show();
    this.qtdAtendimentosAno(this.ano);
    this.qtdAtendimentosNaturezas(this.ano);
    this.qtdAtendimentosSecretaria(0, this.ano);
    this.qtdAtendimentosAssunto(this.ano);
    this.qtdAtendimentosAnual(this.ano);
    this.qtdAvaliacaoPesquisa(this.ano);
    this.qtdAtendimentosOrigem(this.ano);
    this.qtdAtendimentosResolutividade(this.ano);
    this.qtdAtendimentosSetorNatureza(this.ano);
  }

  qtdAtendimentosAno(ano: any) {
    this.atendimentoService.
    qtdAtendimentosPainelOuv(ano).
       then(resultado => {
         this.qtdAtendimentoAno = resultado.totalAtendimentos;
         this.qtdAtendimentoAnoNaoConcluidos = resultado.totalAtendimentosTramitacao;
         this.qtdAtendimentoAnoConcluidos = resultado.totalAtendimentosResolvidos;
         this.qtdAtendimentoAnoTramitacaoNaoVencido = resultado.totalAtendimentosTramitacaoNaoVencidos;
         this.qtdAtendimentoAnoTramitacaoVencido = resultado.totalAtendimentosTramitacaoVencidos;
         this.totalAtendimentosNovos = resultado.totalAtendimentosNovos;
         this.percentualResolvido = resultado.percentualResolvido;
         this.percentualTramitacao = resultado.percentualTramitacao;

       })
    }

  qtdAtendimentosNaturezas(ano: number) {
    this.atendimentoService.
    qtdAtendimentosNatureza(ano).  
        then(resultado => {
          this.chartDataNatureza = resultado;
     }).then(() => {
    this.dataSourceNatureza = {
      chart: {
        captionOnTop: "1",
        numberSuffix: "%",
        theme: "gammel"
      },
      data: this.chartDataNatureza
    };
  })
}

qtdAtendimentosOrigem(ano: any) {
  this.atendimentoService.
  qtdAtendimentosOrigem(ano).  
      then(resultado => {
        this.chartDataAtendimentosOrigem = resultado;
   }).then(() => {
  this.dataSourceAtendimentosOrigem = {
    chart: {
      captionOnTop: "1",
      numberSuffix: "%",
      theme: "gammel"
    },
    data: this.chartDataAtendimentosOrigem
  };
})
}

qtdAvaliacaoPesquisa(ano: number) {
  this.atendimentoService.
  qtdAvaliacaoPesquisa(ano).  
      then(resultado => {
        this.chartDataAvaliacaoPesquisa = resultado;
   }).then(() => {
  this.dataSourceAvaliacaoPesquisa = {
    chart: {
      captionOnTop: "1",
      numberSuffix: "%",
      theme: "gammel"
    },
    data: this.chartDataAvaliacaoPesquisa
  };
})
}

qtdAtendimentosSecretaria(mes: any, ano: any) {
  this.atendimentoService.qtdAtendimentosSecretaria(mes, ano).then(resultado => {
    this.chartDataSecretaria = resultado;
  }).then(() => {
    this.dataSourceSecretaria = {
      chart: {
        theme: "gammel"
      },
         data: this.chartDataSecretaria
    };
  })
}


qtdAtendimentosAnual(ano: any) {
  this.atendimentoService.qtdAtendimentosAnual(ano).then(resultado => {
    this.chartDataAtendimentosAno = resultado;
  }).then(() => {
    this.dataSourceAtendimentosAno = {
      chart: {
        theme: "gammel"
      },
         data: this.chartDataAtendimentosAno
    };
  })
}



qtdAtendimentosAssunto(ano: any) {
  this.atendimentoService.qtdAtendimentosAssunto(ano).then(resultado => {
    this.chartDataAssunto = resultado;
    
  
  }).then(() => {
    this.dataSourceAssunto = {
      chart: {
        theme: "gammel"
      },
         data: this.chartDataAssunto
    };

  })
}

qtdAtendimentosResolutividade(ano: number) {
  this.atendimentoService.qtdAtendimentosResolutividade(ano).then(resultado => {
    this.chartDataResolutividade = resultado;
  }).then(() => {
    this.dataSourceResolutividade = {
      chart: {
         captionOnTop: "1",
        numberSuffix: "%",
        theme: "gammel"
      },
         data: this.chartDataResolutividade
    };

  })
}

qtdAtendimentosSetorNatureza(ano: any) {
  this.atendimentoService.qtdAtendimentosSecretariaNatureza(ano).then(resultado => {
    this.chartDataSecretaria = resultado;
  }).then(() => {
    this.dataSourceSetorNatureza = {
      chart: {
        theme: "gammel"
      },
      categories: [
        {
          category: this.chartDataSecretaria.label
        }
    ],
      dataset: this.chartDataSecretaria.seriesName
    };
}).then(() => {
  this.loaderService.hide();  
})
}

}
