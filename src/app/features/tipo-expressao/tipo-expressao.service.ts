import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SessionService } from 'src/app/core/services/session.service';


@Injectable({
  providedIn: 'root'
})
export class TipoExpressaoService {

  tipoExpressaoUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { 
    this.tipoExpressaoUrl = `${environment.apiUrl}/tipoExpressoes`;
  }

  listar(): Promise<any> {

    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get<any>(`${this.tipoExpressaoUrl}/listar?`, {params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.tipoExpressoesDtoList;
     });
  }
}
