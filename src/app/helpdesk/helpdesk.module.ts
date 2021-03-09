import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpdeskRoutingModule } from './helpdesk-routing.module';
import { HelpdeskComponent } from './helpdesk.component';


@NgModule({
  declarations: [HelpdeskComponent],
  imports: [
    CommonModule,
    HelpdeskRoutingModule
  ]
})
export class HelpdeskModule { }
