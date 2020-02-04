import { Pipe, PipeTransform } from '@angular/core';
import {Services} from '../../models/services.model';

@Pipe({
  name: 'reverseOnUrdu'
})
export class ReverseOnUrduPipe implements PipeTransform {
  private prevLang: string;

  transform(value: any[], urdu: boolean): Services[] {
    if (urdu) {
      this.prevLang = 'urdu';
      return value.reverse();
    }

    if (this.prevLang === 'urdu') {
      this.prevLang = '';
      return value.reverse();
    }

    return value;
  }
}
