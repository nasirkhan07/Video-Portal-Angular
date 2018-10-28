import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input('rating') rating: number;

  ngOnInit() {
  }

  @Input() starCount: number;
  @Output() rate = new EventEmitter();
  stars: number[] = [1, 2, 3, 4, 5];

  constructor() {
    const count = this.starCount < 0 ? 5 : this.starCount;
  }

  /**
   * Rate Event fire
   * 
   * @param {any} star 
   * @memberof RatingComponent
   */
  onRate(star) {
    this.rate.emit(star);
    this.rating = star;
  }

}
