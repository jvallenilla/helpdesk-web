import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private dest: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  loginForm = this.fb.group(
    {
      username: ['', [Validators.required,]],
      password: ['', [Validators.required,]]
    }
  )

  ngOnInit(): void {
  }

  doLogin(): void {
    this.authService.login(this.loginForm.value)
    .pipe(
      takeUntil(this.dest)
    )
    .subscribe(
      res => {
        localStorage.setItem('access_token', res.access)
        this.router.navigate(['/tickets']);
      },
      err => {
        if(err.status == 500){
          this.toastr.error("Ha ocurrido un problema");
          return;
        }
        for( let el in err.error){
          this.toastr.error(err.error[el]);
        }
      }
    )

  }

  ngOnDestroy(){
    this.dest.next(true);
    this.dest.unsubscribe();
  }
}
