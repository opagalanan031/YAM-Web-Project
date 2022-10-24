import { TestBed } from '@angular/core/testing';

import { AnyMemberGuard } from './any-member.guard';

describe('AnyMemberGuard', () => {
  let guard: AnyMemberGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AnyMemberGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
