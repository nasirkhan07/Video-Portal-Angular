import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Input() active: boolean;
  @Input() position: number;
  @Output() rate = new EventEmitter();

  /**
   * Rate Start Event Emit
   * 
   * @memberof StarComponent
   */
  rateStar(data:any) {
    this.rate.emit(this.position);
  }
}
