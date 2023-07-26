import { ListaEncaminhamentosRecebidosModule } from './features/painel/lista-encaminhamentos-recebidos/lista-encaminhamentos-recebidos.module';
import { AtendimentoAreaModule } from './relatorios/atendimento-area/atendimento-area.module';
import { AtendimentoModule } from './features/atendimento/atendimento.module';
import { TipoDocumentoModule } from './features/tipo-documento/tipo-documento.module';
import { ModeloDocumentoModule } from './features/modelo-documento/modelo-documento.module';
import { ConfiguracaoModule } from './features/configuracao/configuracao.module';
import { TipoManifestanteModule } from './features/tipo-manifestante/tipo-manifestante.module';
import { FeriadoModule } from './features/feriado/feriado.module';
import { SetorModule } from './features/setor/setor.module';
import { DescricaoOuvidoriaModule } from './features/descricao-ouvidoria/descricao-ouvidoria.module';
import { DescricaoEmailModule } from './features/descricao-email/descricao-email.module';
import { OrigemManifestacaoModule } from './features/origem-manifestacao/origem-manifestacao.module';
import { AssuntoModule } from './features/assunto/assunto.module';
import { AreaModule } from './features/area/area.module';
import { OrgaoModule } from './features/orgao/orgao.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/gaurds/auth.gaurd';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { ErrorComponent } from './shared/error/error.component';

const appRoutes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('src/app/features/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'register',
        loadChildren: () => import('src/app/features/register-user/register-user.module').then(m => m.RegisterUserModule)
    },
    {
        path: 'main',
        component: LayoutComponent,
        children: [
        {
            path: 'dashboard',
            loadChildren: () => import('src/app/features/dashboard/dashboard.module').then(m => m.DashboardModule),
            canActivate: [AuthGuard]
        },
        {
          path: 'dashboard-gerencial',
          loadChildren: () => import('src/app/features/dashboard-gerencial/dashboard-gerencial.module').then(m => m.DashboardGerencialModule),
          canActivate: [AuthGuard]
        },        
        {
          path: 'atendimento',
          loadChildren: () => import('src/app/features/atendimento/atendimento.module').then(m => m.AtendimentoModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'despacho-cobranca',
          loadChildren: () => import('src/app/features/despacho-cobranca/despacho-cobranca.module').then(m => m.DespachoCobrancaModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'tratar-encaminhamento',
          loadChildren: () => import('src/app/features/tratar-encaminhamento/tratar-encaminhamento.module').then(m => m.TratarEncaminhamentoModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'painel-interativo',
          loadChildren: () => import('src/app/features/painel-interativo/painel-interativo.module').then(m => m.PainelInterativoModule),
          canActivate: [AuthGuard]
        },        
        {
            path: 'natureza',
            loadChildren: () => import('src/app/features/natureza/natureza.module').then(m => m.NaturezaModule),
            canActivate: [AuthGuard]
        },
        {
          path: 'orgao',
          loadChildren: () => import('src/app/features/orgao/orgao.module').then(m => m.OrgaoModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'area',
          loadChildren: () => import('src/app/features/area/area.module').then(m => m.AreaModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'assunto',
          loadChildren: () => import('src/app/features/assunto/assunto.module').then(m => m.AssuntoModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'origem-manifestacao',
          loadChildren: () => import('src/app/features/origem-manifestacao/origem-manifestacao.module').then(m => m.OrigemManifestacaoModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'tipo-resposta',
          loadChildren: () => import('src/app/features/tipo-resposta/tipo-resposta.module').then(m => m.TipoRespostaModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'descricao-email',
          loadChildren: () => import('src/app/features/descricao-email/descricao-email.module').then(m => m.DescricaoEmailModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'descricao-ouvidoria',
          loadChildren: () => import('src/app/features/descricao-ouvidoria/descricao-ouvidoria.module').then(m => m.DescricaoOuvidoriaModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'setor',
          loadChildren: () => import('src/app/features/setor/setor.module').then(m => m.SetorModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'feriado',
          loadChildren: () => import('src/app/features/feriado/feriado.module').then(m => m.FeriadoModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'tipo-manifestante',
          loadChildren: () => import('src/app/features/tipo-manifestante/tipo-manifestante.module').then(m => m.TipoManifestanteModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'configuracao',
          loadChildren: () => import('src/app/features/configuracao/configuracao.module').then(m => m.ConfiguracaoModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'modelo-documento',
          loadChildren: () => import('src/app/features/modelo-documento/modelo-documento.module').then(m => m.ModeloDocumentoModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'acesso-negado',
          loadChildren: () => import('src/app/features/seguranca/acesso-negado/acesso-negado.module').then(m => m.AcessoNegadoModule),
          canActivate: [AuthGuard]
        },   
        {
          path: 'alterar-senha',
          loadChildren: () => import('src/app/features/seguranca/alterar-senha/alterar-senha.module').then(m => m.AlterarSenhaModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'tipo-documento',
          loadChildren: () => import('src/app/features/tipo-documento/tipo-documento.module').then(m => m.TipoDocumentoModule),
          canActivate: [AuthGuard]
        }]
    },
    {
        path: 'relatorio',
        component: LayoutComponent,
        children: [
          {
            path: 'atendimento-area',
            loadChildren: () => import('src/app/relatorios/atendimento-area/atendimento-area.module').then(m => m.AtendimentoAreaModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'encaminhamento-setor',
            loadChildren: () => import('src/app/relatorios/encaminhamento-setor/encaminhamento-setor.module').then(m => m.EncaminhamentoSetorModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'atendimento-periodo',
            loadChildren: () => import('src/app/relatorios/atendimento-periodo/atendimento-periodo.module').then(m => m.AtendimentoPeriodoModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'atendimento-natureza',
            loadChildren: () => import('src/app/relatorios/atendimento-natureza/atendimento-natureza.module').then(m => m.AtendimentoNaturezaModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'atendimento-assunto',
            loadChildren: () => import('src/app/relatorios/atendimento-assunto/atendimento-assunto.module').then(m => m.AtendimentoAssuntoModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'atendimento-priorizacao',
            loadChildren: () => import('src/app/relatorios/atendimento-priorizacao/atendimento-priorizacao.module').then(m => m.AtendimentoPriorizacaoModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'atendimento-origem',
            loadChildren: () => import('src/app/relatorios/atendimento-origem/atendimento-origem.module').then(m => m.AtendimentoOrigemModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'atendimento-area-assunto',
            loadChildren: () => import('src/app/relatorios/atendimento-area-assunto/atendimento-area-assunto.module').then(m => m.AtendimentoAreaAssuntoModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'atendimento-tipo-manifestante',
            loadChildren: () => import('src/app/relatorios/atendimento-tipo-manifestante/atendimento-tipo-manifestante.module').then(m => m.AtendimentoTipoManifestanteModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'atendimento-secretaria',
            loadChildren: () => import('src/app/relatorios/atendimento-secretaria/atendimento-secretaria.module').then(m => m.AtendimentoSecretariaModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'atendimento-usuario',
            loadChildren: () => import('src/app/relatorios/atendimento-usuario/atendimento-usuario.module').then(m => m.AtendimentoUsuarioModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'atendimento-media-resposta',
            loadChildren: () => import('src/app/relatorios/atendimento-media-resposta/atendimento-media-resposta.module').then(m => m.AtendimentoMediaRespostaModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'eficiencia-ouvidoria',
            loadChildren: () => import('src/app/relatorios/eficiencia-ouvidoria/eficiencia-ouvidoria.module').then(m => m.EficienciaOuvidoriaModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'comparativo-periodo',
            loadChildren: () => import('src/app/relatorios/comparativo-periodo/comparativo-periodo.module').then(m => m.ComparativoPeriodoModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'produtividade-callcenter',
            loadChildren: () => import('src/app/relatorios/produtividade-callcenter/produtividade-callcenter.module').then(m => m.ProdutividadeCallCenterModule),
            canActivate: [AuthGuard]
          },  
          {
            path: 'estatistica-satisfacao',
            loadChildren: () => import('src/app/relatorios/estatistica-satisfacao/estatistica-satisfacao.module').then(m => m.EstatisticaSatisfacaoModule),
            canActivate: [AuthGuard]
          },                                         
          {
            path: 'atendimento-geral',
            loadChildren: () => import('src/app/relatorios/atendimento-geral/atendimento-geral.module').then(m => m.AtendimentoGeralModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'lista-detalhe-encaminhamento',
            loadChildren: () => import('src/app/relatorios/lista-detalhe-encaminhamento/lista-detalhe-encaminhamento.module').then(m => m.ListaDetalheEncaminhamentoModule),
            canActivate: [AuthGuard]
          },          

      ]
    },
    {
        path: 'painel',
        component: LayoutComponent,
        children: [
          {
            path: 'novas-manifestacoes',
            loadChildren: () => import('src/app/features/painel/lista-novas-manifestacoes/lista-novas-manifestacoes.module').then(m => m.ListaNovasManifestacoesModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'lista-manifestacoes-status',
            loadChildren: () => import('src/app/features/painel/lista-manifestacoes-status/lista-manifestacoes-status.module').then(m => m.ListaManifestacoesStatusModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'encaminhamentos-recebidos',
            loadChildren: () => import('src/app/features/painel/lista-encaminhamentos-recebidos/lista-encaminhamentos-recebidos.module').then(m => m.ListaEncaminhamentosRecebidosModule),
            canActivate: [AuthGuard]
          }
        ]
    },
    {
        path: 'error',
        component: ErrorComponent,
        //loadChildren: () => import('src/app/shared/error/error.module').then(m => m.ErrorModule)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
