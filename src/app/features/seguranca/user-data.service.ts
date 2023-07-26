import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
/**
 * user service class
 */
export class UserDataService {


    tokenUrl: string;
    jwtPayload: any;
    tokensRenokeUrl: string;




    constructor(
      private http: HttpClient,
      private jwtHelper: JwtHelperService
    ) {
      this.tokenUrl = `${environment.apiUrl}/oauth/token`;
      this.tokensRenokeUrl = `${environment.apiUrl}/tokens/revoke`;
      this.carregarToken();
    }



    temPermissao(permissao: string) {
      return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
    }

    permissoesUsuario() {
      console.log(this.jwtPayload);
      return this.jwtPayload && this.jwtPayload.authorities;
    }

    verificaAutorizacao(roles) {
      for (const role of roles) {
        if (this.temPermissao(role)) {
          return true;
        }
      }
  
      return false;
    }
  

    /**
     * get user by user name and password
     * @param userName
     * @param password
     */
    getUserByUserNameAndPassword(userName: string, password: string): Promise<void> {

      const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');


      const body = `username=${userName}&password=${password}&grant_type=password`;

      return this.http.post(`${this.tokenUrl}`,
      body, {headers, withCredentials: true})
      .toPromise()
       .then(
         response => {
           console.log(response);
           this.armazenarToken(response['access_token']);

           return ;
         }
       ).catch(response => {
         console.log(response['error'].error_description);
         return Promise.reject(response['error'].error_description);

       });
    }

    private armazenarToken(token: string) {
      console.log(token);

      this.jwtPayload = this.jwtHelper.decodeToken(token);
      localStorage.setItem('token', token);
    }

    private carregarToken() {
      const token = localStorage.getItem('token');

      if (token) {
        this.armazenarToken(token);
      }
    }

    obterNovoAccessToken(): Promise<void> {

      const headers = new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

      const body = 'grant_type=refresh_token';

      return this.http.post(`${this.tokenUrl}`, body,
          { headers, withCredentials: true })
        .toPromise()
        .then(response => {
          this.armazenarToken(response['access_token']);
          return Promise.resolve(null);
        })
        .catch(response => {
          return Promise.resolve(null);
        });
    }

    isAccessTokenInvalido() {
      const token = localStorage.getItem('token');

      return !token || this.jwtHelper.isTokenExpired(token);
    }

    limparAccessToken() {
      localStorage.removeItem('token');
      this.jwtPayload = null;
    }


    logout() {
      return this.http.delete(this.tokensRenokeUrl, { withCredentials: true })
        .toPromise()
        .then(() => {
          this.limparAccessToken();
        });
    }


}
