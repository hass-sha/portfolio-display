import { TestBed } from '@angular/core/testing';

import { NgRecaptchaService } from './ng-recaptcha.service';

describe('NgRecaptchaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgRecaptchaService = TestBed.get(NgRecaptchaService);
    expect(service).toBeTruthy();
  });
});
