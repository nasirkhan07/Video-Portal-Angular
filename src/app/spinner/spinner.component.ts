import { Component, Input } from '@angular/core';

interface SpinnerConfig {
  height: string;
  width: string;
}

@Component({
 selector: 'spinner',
 templateUrl: './spinner.component.html',
 styleUrls: ['./spinner.component.css']
})

export class SpinnerComponent {

  spinnerStyle: any;
  @Input('spinnerConfig') spinnerConfig: SpinnerConfig;

  constructor() { }

}
