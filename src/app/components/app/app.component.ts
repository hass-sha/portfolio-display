import {Component} from '@angular/core';
import {HelperService} from '../../core/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private helper: HelperService) {
    helper.initConfig();
  }
}
