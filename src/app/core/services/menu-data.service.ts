import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomMenuItem } from '../models/menu-item.model';

@Injectable({
    providedIn: 'root',
})
/**
 * menu data service
 */
export class MenuDataService {

    public toggleMenuBar: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    getMenuList(): CustomMenuItem[] {
        return [
            {
               Label: 'Dashboard', Icon: 'fa-home', RouterLink: '/main/dashboard', Childs: null, IsChildVisible: false, Role: 'ROLE_DASHBOARD'
            },
            {
              Label: 'Dashboard Gerencial', Icon: 'fa-home', RouterLink: '/main/dashboard-gerencial', Childs: null, IsChildVisible: false, Role: 'ROLE_DASHBOARD_GERENCIAL'
            },
            {
                Label: 'Atendimento', Icon: 'fa-envelope', RouterLink: '/main/atendimento', Childs: null, IsChildVisible: false, Role: 'ROLE_CONSULTAR_ATENDIMENTO'
            },
            {
              Label: 'Despacho de Cobrança', Icon: 'fa-envelope', RouterLink: '/main/despacho-cobranca', Childs: null, IsChildVisible: false, Role: 'ROLE_DESPACHO_COBRANCA'
            },
            {
              Label: 'Tratar Encaminhamentos', Icon: 'fa-envelope', RouterLink: '/main/tratar-encaminhamento', Childs: null, IsChildVisible: false, Role: 'ROLE_TRATAR_ENCAMINHAMENTO'
            },
            {
              Label: 'Painel Interativo', Icon: 'fa-envelope', RouterLink: '/main/painel-interativo', Childs: null, IsChildVisible: false, Role: 'ROLE_PAINEL_INTERATIVO'
            },
            {
                Label: 'Configurações', Icon: 'fa-cart-plus', RouterLink: null, Childs: [
                    {
                      Label: 'Área', RouterLink: '/main/area', Childs: null, IsChildVisible: false, Role: 'ROLE_CONSULTAR_AREA'
                    },
                    {
                      Label: 'Assunto', RouterLink: '/main/assunto', Childs: null, IsChildVisible: false, Role: 'ROLE_CONSULTAR_ASSUNTO'
                    },
                    {
                      Label: 'Configuração', RouterLink: '/main/configuracao', Childs: null, IsChildVisible: false, Role: 'ROLE_CONFIGURACAO'
                    },
                    {
                      Label: 'Descrição Email', RouterLink: '/main/descricao-email', Childs: null, IsChildVisible: false, Role: 'ROLE_DESCRICAO_EMAIL'
                    },
                    {
                      Label: 'Descrição Ouvidoria', RouterLink: '/main/descricao-ouvidoria', Childs: null, IsChildVisible: false, Role: 'ROLE_DESCRICAO_OUVIDORIA'
                    },
                    {
                      Label: 'Feriado', RouterLink: '/main/feriado', Childs: null, IsChildVisible: false, Role: 'ROLE_CONSULTAR_FERIADO'
                    },
                    {
                      Label: 'Modelo', RouterLink: '/main/modelo-documento', Childs: null, IsChildVisible: false, Role: 'ROLE_CONSULTAR_MODELO_DOCUMENTO'
                    },
                    {
                      Label: 'Natureza', RouterLink: '/main/natureza', Childs: null, IsChildVisible: false, Role: 'ROLE_CONSULTAR_NATUREZA'
                    },
                    {
                      Label: 'Origem Manifestação', RouterLink: '/main/origem-manifestacao', Childs: null, IsChildVisible: false, Role: 'ROLE_CONSULTAR_ORIGEM_MANIFESTACAO'
                    },
                    {
                      Label: 'Setor', RouterLink: '/main/setor', Childs: null, IsChildVisible: false, Role: 'ROLE_CONSULTAR_SETOR'
                    },
                    {
                      Label: 'Tipo Documento', RouterLink: '/main/tipo-documento', Childs: null, IsChildVisible: false, Role: 'ROLE_CONSULTAR_TIPO_DOCUMENTO'
                    },
                    {
                      Label: 'Tipo Manifestante', RouterLink: '/main/tipo-manifestante', Childs: null, IsChildVisible: false, Role: 'ROLE_CONSULTAR_TIPO_MANIFESTANTE'
                    },
                    {
                      Label: 'Tipo Resposta', RouterLink: '/main/tipo-resposta', Childs: null, IsChildVisible: false, Role: 'ROLE_CONSULTAR_TIPO_RESPOSTA'
                    },

                    ], IsChildVisible: false, Role: 'ROLE_CONFIGURACAO'
            },

            {
                Label: 'Indicadores', Icon: 'fa-book', RouterLink: null, Childs: [
                  {
                    Label: 'Comparativo Período', RouterLink: '/relatorio/comparativo-periodo', Childs: null, IsChildVisible: false, Role: 'ROLE_COMPARATIVO_PERIODO'
                  },
                    {
                      Label: 'Avaliação da Ouvidoria', RouterLink: '/relatorio/eficiencia-ouvidoria', Childs: null, IsChildVisible: false, Role: 'ROLE_INDICADOR_EFICIENCIA_OUVIDORIA'
                    },
                    {
                      Label: 'Produtividade Call Center', RouterLink: '/relatorio/produtividade-callcenter', Childs: null, IsChildVisible: false, Role: 'ROLE_PRODUTIVIDADE_CALLCENTER'
                    },
                    {
                      Label: 'Estatística Pesq. Satisfação', RouterLink: '/relatorio/estatistica-satisfacao', Childs: null, IsChildVisible: false, Role: 'ROLE_ESTATISTICA_SATISFACAO'
                    },                    
  

              ],    IsChildVisible: false,Role: 'ROLE_INDICADOR'
            },

            {
              Label: 'Relatórios', Icon: 'fa-book', RouterLink: null, Childs: [
                  {
                    Label: 'Atendimento por Área', RouterLink: '/relatorio/atendimento-area-assunto', Childs: null, IsChildVisible: false, Role: 'ROLE_RELATORIO_AREA_ASSUNTO'
                  },
                  {
                    Label: 'Atendimento por Assunto', RouterLink: '/relatorio/atendimento-assunto', Childs: null, IsChildVisible: false, Role: 'ROLE_RELATORIO_ASSUNTO'
                  },
                  {
                    Label: 'Média de Resposta por Área', RouterLink: '/relatorio/atendimento-media-resposta', Childs: null, IsChildVisible: false, Role: 'ROLE_RELATORIO_MEDIA_RESPOSTA'
                  },
                  {
                    Label: 'Atendimento Geral', RouterLink: '/relatorio/atendimento-geral', Childs: null, IsChildVisible: false, Role: 'ROLE_RELATORIO_GERAL'
                  },                  
                  {
                    Label: 'Atendimento por Natureza', RouterLink: '/relatorio/atendimento-natureza', Childs: null, IsChildVisible: false, Role: 'ROLE_RELATORIO_NATUREZA'
                  },
                  {
                    Label: 'Atendimento por Origem', RouterLink: '/relatorio/atendimento-origem', Childs: null, IsChildVisible: false, Role: 'ROLE_RELATORIO_ORIGEM'
                  },
                  {
                    Label: 'Atendimento por Período', RouterLink: '/relatorio/atendimento-periodo', Childs: null, IsChildVisible: false, Role: 'ROLE_RELATORIO_PERIODO'
                  },
                  {
                    Label: 'Atendimento por Priorização', RouterLink: '/relatorio/atendimento-priorizacao', Childs: null, IsChildVisible: false, Role: 'ROLE_RELATORIO_PRIORIZACAO'
                  },
                  {
                    Label: 'Atendimento por Setor', RouterLink: '/relatorio/atendimento-area', Childs: null, IsChildVisible: false, Role: 'ROLE_RELATORIO_AREA'
                  },
                  {
                    Label: 'Encaminhamento por Setor', RouterLink: '/relatorio/encaminhamento-setor', Childs: null, IsChildVisible: false, Role: 'ROLE_RELATORIO_AREA'
                  },
                  {
                    Label: 'Atendimento por Secretaria', RouterLink: '/relatorio/atendimento-secretaria', Childs: null, IsChildVisible: false, Role: 'ROLE_RELATORIO_SECRETARIA'
                  },
                  {
                    Label: 'Atendimento por Tipo Manifestante', RouterLink: '/relatorio/atendimento-tipo-manifestante', Childs: null, IsChildVisible: false, Role: 'ROLE_RELATORIO_TIPO_MANIFESTANTE'
                  },
                  {
                    Label: 'Atendimento por Usuário', RouterLink: '/relatorio/atendimento-usuario', Childs: null, IsChildVisible: false, Role: 'ROLE_RELATORIO_USUARIO'
                  }

            ],    IsChildVisible: false,Role: 'ROLE_RELATORIOS'
          },



            {
                Label: 'Painel de Controle', Icon: 'fa-desktop', RouterLink: null, Childs: [
                  {
                    Label: 'Novos Atendimentos', RouterLink: '/painel/novas-manifestacoes', Childs: null, IsChildVisible: true, Role: 'ROLE_PAINEL_CONTROLE'
                  },
                  {
                    Label: 'Atendimentos Classif. Não Enc.', RouterLink: '/painel/lista-manifestacoes-status', Childs: null, IsChildVisible: true, Role: 'ROLE_PAINEL_CONTROLE'
                  },
                  {
                    Label: 'Encaminhamentos Recebidos', RouterLink: '/painel/encaminhamentos-recebidos', Childs: null, IsChildVisible: true, Role: 'ROLE_PAINEL_CONTROLE'
                  },
              ],    IsChildVisible: true, Role: 'ROLE_PAINEL_CONTROLE'
            },
            {
              Label: 'Alterar Senha', Icon: 'fa-home', RouterLink: '/main/alterar-senha', Childs: null, IsChildVisible: false, Role: null
            },
            {
                Label: 'Helpdesk', Icon: 'fa-home', RouterLink: 'helpdesk', Childs: null, IsChildVisible: false, Role: null
            },
            {
                Label: 'Sair', Icon: 'fa-home', RouterLink: 'sair', Childs: null, IsChildVisible: false, Role: null
            }

        ];
    }
}
