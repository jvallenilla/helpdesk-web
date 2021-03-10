import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { TicketService } from './ticket.service';
import { Ticket } from '../models';

@Injectable()
export class TicketResolver implements Resolve<Ticket | boolean> {
  constructor(
    private ticketService: TicketService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ticket | boolean> {
    if (route.params['id'] == 'new'){
      return of(true)
    }
    return this.ticketService.getTicket(route.params['id'])
  }
}
