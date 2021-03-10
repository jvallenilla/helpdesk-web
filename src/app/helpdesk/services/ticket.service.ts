import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Ticket, TicketPage } from '../models';

@Injectable()
export class TicketService {

  constructor(
    private http: HttpClient,
  ) { }

  listTickets(params?: any){
    return this.http.get<TicketPage>(`${environment.serverUrl}tickets/`, {params: params})
  }

  getTicket(id: number){
    return this.http.get<Ticket>(`${environment.serverUrl}tickets/${id}/`);
  }

  createTicket(data: Ticket){
    return this.http.post<Ticket>(`${environment.serverUrl}tickets/`, data);
  }

  canCreate(){
    return this.http.get<any>(`${environment.serverUrl}tickets/perms/`);
  }
}
