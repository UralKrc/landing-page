import { CarAnimation } from "..";
import domElements from "../../../helpers/DomElements";

describe('CarAnimation', () => {
  let carAnimation: CarAnimation;

  beforeEach(() => {
    carAnimation = new CarAnimation();
  });

  test('initialize initializes car wheel images and wheel elements correctly', () => {
    carAnimation.initialize();

    domElements.carWheelImages.forEach((img: Element) => {
      expect((img as HTMLElement).style.animationDuration).toBe('0.54s');
    });

    if (domElements.wheelElement[0]) {
      expect(domElements.wheelElement[0].textContent).toBe('19"');
      expect(domElements.wheelElement[0].parentElement?.classList.contains('active')).toBe(true);
    }

    if (domElements.wheelElement[1]) {
      expect(domElements.wheelElement[1].textContent).toBe('21"');
    }
  });

  test('setWheelAnimationDuration sets correct animationDuration', () => {
    const speed = 120;
    const expectedDuration = '0.4s';
    carAnimation.setWheelAnimationDuration(speed);
    domElements.carWheels.forEach((wheel: Element) => {
      expect((wheel as HTMLElement).style.animationDuration).toBe(expectedDuration);
    });
  });

  test('calculateAnimationDuration calculates correct animation duration', () => {
    expect(carAnimation.calculateAnimationDuration(70)).toBeCloseTo(0.8);
    expect(carAnimation.calculateAnimationDuration(140)).toBeCloseTo(0.28);
    expect(carAnimation.calculateAnimationDuration(105)).toBeCloseTo(0.54);
  });
});