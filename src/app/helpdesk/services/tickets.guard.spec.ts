import { TestBed } from '@angular/core/testing';

import { TicketsGuard } from './tickets.guard';

describe('TicketsGuard', () => {
  let guard: TicketsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TicketsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
