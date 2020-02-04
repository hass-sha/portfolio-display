import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgRecaptchaService {
  execute;
  reset;
  getResponse;
}
