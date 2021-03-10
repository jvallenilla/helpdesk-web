import { Injectable } from '@angular/core';
import { Router, CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { TicketService } from './ticket.service';


@Injectable({ providedIn: 'root' })
export class TicketsGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.canAccessLogin()
    .pipe(
        tap(val => {
          if (val == true ) this.router.navigate(['/']);
        }),
        map(_ => true)
      );
  }
  
}

@Injectable()
export class NewTicketGuard implements CanActivate {
  constructor(
    private ticketService: TicketService,
    private router: Router
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean > | boolean {
    if (route.params['id'] == 'new') {
      return this.ticketService.canCreate()
      .pipe(
        map(
          (res: any) => {
            if (res.canCreate == 'allowed'){
              return true;
            }
            return false;
          }
        )
      )
    }else{
      return of(true);
    }
  }

}