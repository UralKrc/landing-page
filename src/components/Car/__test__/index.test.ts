import { Car } from "..";
import { CarState } from "../../CarState";
import { CarAnimation } from "../../CarAnimation";
import { CarAC } from "../../CarAC";
import { CarRange } from "../../CarRange";

describe('Car', () => {
  let car: Car;

  beforeEach(() => {
    car = new Car();
  });

  it('initializes with the correct properties', () => {
    expect(car.model).toBe("100D");
    expect(car.animation).toBeInstanceOf(CarAnimation);
    expect(car.range).toBeInstanceOf(CarRange);
    expect(car.ac).toBeInstanceOf(CarAC);
    expect(car.controls).toBeInstanceOf(CarState);
  });
});