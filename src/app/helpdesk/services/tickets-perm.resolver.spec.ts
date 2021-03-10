import { TestBed } from '@angular/core/testing';

import { TicketsPermResolver } from './tickets-perm.resolver';

describe('TicketsPermResolver', () => {
  let resolver: TicketsPermResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TicketsPermResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
