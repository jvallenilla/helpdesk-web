import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms'
import { Subject } from 'rxjs';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit, OnDestroy {

  dest: Subject<boolean> = new Subject<boolean>();
  newTicket: boolean = true;
  ticketId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private ticketService: TicketService,
  ) { }

  ngOnInit(): void {
    this.route.data
      .pipe(
        takeUntil(this.dest)
      )
      .subscribe(
        data => {
          if (data.ticket === true) return;
          this.ticketForm.patchValue(data.ticket);
          this.newTicket = false
          this.ticketId = data.ticket.id;
        }
      )
  }

  ticketForm = this.fb.group(
    {
      title: ['', [Validators.required,]],
      description: ['', [Validators.required,]]
    }
  )

  createTicket(){
    this.ticketService.createTicket(this.ticketForm.value)
      .pipe(
        takeUntil(this.dest)
      )
      .subscribe(
        _ => {
          this.toastr.success('Ticket enviado con éxito');
          this.ticketForm.reset();
        },
        err => {
          if (err.status == 500) {
            this.toastr.error("Ha ocurrido un problema");
            return;
          }
          for (let el in err.error) {
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
