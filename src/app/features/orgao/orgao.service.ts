import { UtilService } from './../../util.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Orgao } from 'src/app/core/models/orgao.model';

export class OrgaoFiltro {
  descricao!: string;
}

@Injectable({
    providedIn: 'root',
})
export class OrgaoService {

  orgaoUrl: string;

  constructor(
    private http: HttpClient,
    private utilService: UtilService
  ) {
    this.orgaoUrl = `${environment.apiUrl}/orgaos`;
  }

  listar(): Promise<any> {

    return this.http.get<any>(`${this.orgaoUrl}/listar`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.orgaoDtoList;
     });
  }

  pesquisar(filtro: OrgaoFiltro): Promise<any> {
    let params = new HttpParams()

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.orgaoUrl}?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

    editar(codigo: number): Promise<Orgao>{
      return this.http.get<Orgao>(`${this.orgaoUrl}/${codigo}`)
      .toPromise()
       .then(res => <Orgao>res)
           .then(data => {
            data.orgaoDto.dataCriacao = this.utilService.converterStringsParaDatas(data.orgaoDto.dataCriacao);
            return data;
       });

    }



    atualizar(orgao: Orgao): Promise<Orgao> {
      return this.http.put<Orgao>(`${this.orgaoUrl}/${orgao.id}`, orgao)
        .toPromise()
        .then(response => {
          const orgaoAlterado = response;
          return orgaoAlterado;
        });
    }

    adicionar(orgao: Orgao): Promise<Orgao> {
      return this.http.post<Orgao>(`${this.orgaoUrl}`, orgao)
        .toPromise().then();
    }

    excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.orgaoUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
    }


}
