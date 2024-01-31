import { DOMElements } from "../DomElements";

describe('DOMElements', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="hamburger"></div>
      <div class="range"></div>
      <div class="speed">
        <div class="calculator-text"></div>
        <div class="increase"></div>
        <div class="decrease"></div>
      </div>
      <div class="temp">
        <div class="calculator-text"></div>
        <div class="increase"></div>
        <div class="decrease"></div>
      </div>
      <div class="ac-toggle">
        <div class="ac-text"></div>
        <img src="ac-image.png" />
      </div>
      <div class="wheels">
        <div class="calculator-text"></div>
        <div class="wheels-19"></div>
        <div class="wheels-21"></div>
      </div>
      <div class="range-100D"></div>
      <div class="range-P100D"></div>
      <div class="car-wheel-image"></div>
      <div class="car-wheel"></div>
    `;
  });

  it('should be defined', () => {
    expect(DOMElements).toBeDefined();
  });

  it('should create a new instance', () => {
    const domElements = new DOMElements();
    expect(domElements).toBeInstanceOf(DOMElements);
  });

  it('should select the correct elements', () => {
    const domElements = new DOMElements();
    expect(domElements.menuElement).toBeDefined();
    expect(domElements.speedElement).toBeDefined();
    expect(domElements.speedIncrease).toBeDefined();
    expect(domElements.speedDecrease).toBeDefined();
    expect(domElements.tempElement).toBeDefined();
    expect(domElements.tempIncrease).toBeDefined();
    expect(domElements.tempDecrease).toBeDefined();
    expect(domElements.acElement).toBeDefined();
    expect(domElements.acBoxElement).toBeDefined();
    expect(domElements.acImageElement).toBeDefined();
    expect(domElements.wheelElement.length).toBe(1);
    expect(domElements.wheel19).toBeDefined();
    expect(domElements.wheel21).toBeDefined();
    expect(domElements.rangeElement100D).toBeDefined();
    expect(domElements.rangeElementP100D).toBeDefined();
    expect(domElements.rangeElements).toBeDefined();
    expect(domElements.carWheelImages.length).toBe(1);
    expect(domElements.carWheels.length).toBe(1);
  });
});