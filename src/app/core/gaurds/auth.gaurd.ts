import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RouteStateService } from '../services/route-state.service';
import { UserDataService } from '../../features/seguranca/user-data.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private routeStateService: RouteStateService,
        private auth: UserDataService) { }




        canActivate(
            next: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
                
            //if (next.data.roles && !this.auth.verificaAutorizacao(next.data.roles)) {
              //this.routeStateService.add('Acesso Negado',
              //'/main/acesso-negado/acesso-negado', null, false);
              //return false;
            //}
        
            return true;
          }

 
}
