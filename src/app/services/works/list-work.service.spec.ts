import { TestBed } from '@angular/core/testing';

import { ListWorkService } from './list-work.service';

describe('ListWorkService', () => {
  let service: ListWorkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListWorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
