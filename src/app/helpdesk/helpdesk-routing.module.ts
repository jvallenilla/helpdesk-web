import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './tickets/list/list.component';
import { SingleComponent } from './tickets/single/single.component';
import { HelpdeskComponent } from './helpdesk.component';
import { TicketResolver } from './services/ticket.resolver';

const routes: Routes = [
  {
    path: '',
    component: HelpdeskComponent,
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: ':id',
        component: SingleComponent,
        resolve: { ticket: TicketResolver}
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
  providers: [TicketResolver,]
})
export class HelpdeskRoutingModule { }
