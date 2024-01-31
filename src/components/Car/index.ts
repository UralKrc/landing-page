import { CarState } from '../CarState';
import { CarAnimation } from '../CarAnimation';
import { CarAC } from '../CarAC';
import { CarRange } from '../CarRange';

export class Car {
  model: string = "100D";
  controls: CarState;
  animation: CarAnimation;
  ac: CarAC;
  range: CarRange;

  constructor() {
    this.animation = new CarAnimation();
    this.range = new CarRange();
    this.ac = new CarAC(this.range);
    this.controls = new CarState(this.animation, this.range, this.ac);
  }
}

export const car = new Car();