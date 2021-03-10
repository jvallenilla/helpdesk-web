import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TicketService } from '../../services/ticket.service';
import { Ticket, Page } from '../../models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild('descTemp', { static: true }) descTemp!: TemplateRef<any>;
  @ViewChild('btnViewTemp', { static: true }) btnViewTemp!: TemplateRef<any>;

  rows = new Array<Ticket>();
  canCreate: boolean = false;
  dest: Subject<boolean> = new Subject<boolean>();
  colums: Array<any> = [];
  page: Page = {
    size: 0,
    totalElements: 0,
    totalPages: 0,
    pageNumber: 1
  }

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
  ) {
    this.route.parent?.data
    .pipe(
      takeUntil(this.dest)
    )
    .subscribe(
      data => {
        console.log(data)
        if(data.canCreate.canCreate == 'allowed'){
          this.canCreate = true;
        }
      }
    )
  }

  ngOnInit(): void {
    this.setPage({ offset: 0 });
    this.colums = [
      {
        name: 'Creado',
        prop: 'created_at',
      },
      {
        name: 'Título',
        prop: 'title',
      },
      {
        name: 'Usuario',
        sort_prop: 'author',
        prop: 'author_display',
      },
      {
        name: 'Descripción',
        prop: 'description',
        cellTemplate: this.descTemp,
      },
      {
        name: 'Estado',
        sort_prop: 'status',
        prop: 'status_display',
      },
      {
        name:'Opciones',
        prop: 'id',
        cellTemplate: this.btnViewTemp,
        sortable: false,
      }
    ]
  }

  setPage(event?: any, filters={}){
    this.ticketService.listTickets({offset: event.offset * (event.pagezise | 10 ), ...filters})
    .pipe(
      takeUntil(this.dest)
    )
    .subscribe(
      (res) => {
        this.rows = res.results;
        this.page = {
          size: 10,
          totalElements: res.count,
          totalPages: Math.floor(res.count / 10),
          pageNumber: event.offset
        }
      }
    )
  }

  doSort(event: any){
    let ordering = (event.newValue == 'asc' ? '' : '-') + (event.column.sort_prop ? event.column.sort_prop : event.column.prop)
    this.setPage({ offset: 0 }, { ordering: ordering})
  }

  ngOnDestroy(){
    this.dest.next(true);
    this.dest.unsubscribe();
  }
}
