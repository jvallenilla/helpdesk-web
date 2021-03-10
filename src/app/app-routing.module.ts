import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './auth/services/auth.guard';
import { TicketsGuard } from './helpdesk/services/tickets.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canLoad: [LoginGuard],
  },
  {
    path: 'tickets',
    loadChildren: () => import('./helpdesk/helpdesk.module').then(m => m.HelpdeskModule),
    canLoad: [TicketsGuard],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
