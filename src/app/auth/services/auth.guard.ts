import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    // private layoutService: LayoutService,
  ) { }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.canAccessLogin()
      .pipe(
        tap(
          res => {
            if (res == false) {
              this.router.navigate(['tickets'])
            }
          }
        )
      );
  }
}