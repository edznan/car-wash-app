import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SecureInnerPagesGuard } from './secure-inner-pages.guard';

describe('SecureInnerPagesGuard', () => {
  let guard: SecureInnerPagesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    });
    guard = TestBed.inject(SecureInnerPagesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
