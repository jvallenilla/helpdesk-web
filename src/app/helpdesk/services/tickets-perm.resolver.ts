import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { TicketService } from './ticket.service';

@Injectable()
export class TicketsPermResolver implements Resolve<any> {
  constructor(
    private ticketService: TicketService,
  ){ }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.ticketService.canCreate()
  }
}
