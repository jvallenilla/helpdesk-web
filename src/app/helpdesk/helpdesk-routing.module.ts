import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './tickets/list/list.component';
import { SingleComponent } from './tickets/single/single.component';
import { HelpdeskComponent } from './helpdesk.component';
import { TicketResolver } from './services/ticket.resolver';
import { TicketsPermResolver } from './services/tickets-perm.resolver';
import { NewTicketGuard } from './services/tickets.guard';

const routes: Routes = [
  {
    path: '',
    component: HelpdeskComponent,
    resolve: { canCreate: TicketsPermResolver },
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: ':id',
        component: SingleComponent,
        resolve: { ticket: TicketResolver},
        canActivate: [NewTicketGuard,]
      },
      {
        path: '',
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [TicketResolver, TicketsPermResolver, NewTicketGuard]
})
export class HelpdeskRoutingModule { }
