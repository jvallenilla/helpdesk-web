import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HelpdeskRoutingModule } from './helpdesk-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HelpdeskComponent } from './helpdesk.component';
import { ListComponent } from './tickets/list/list.component';
import { SingleComponent } from './tickets/single/single.component';
import { TicketService } from './services/ticket.service';

@NgModule({
  declarations: [HelpdeskComponent, ListComponent, SingleComponent],
  imports: [
    CommonModule,
    HelpdeskRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    TicketService,
  ]
})
export class HelpdeskModule { }
