import domElements, { DOMElements } from "../../helpers/DomElements";

export class CarAnimation {
  domElements: DOMElements;

  constructor() {
    this.domElements = domElements;
    this.initialize();
    this.setWheelAnimationDuration(100);
  }

  initialize(): void {
    this.domElements.carWheelImages.forEach((img: Element) => {
      const duration = this.calculateAnimationDuration(70);
      (img as HTMLElement).style.animationDuration = `${duration}s`;
    });

    const wheelElement = this.domElements.wheelElement[0];
    if (wheelElement) {
      wheelElement.textContent = '19"';
      wheelElement.parentElement?.classList.add('active');
    }

    if (this.domElements.wheelElement[1]) this.domElements.wheelElement[1].textContent = '21"';
  }

  setWheelAnimationDuration(speed: number): void {
    this.domElements.carWheels.forEach((wheel: Element) => {
      const duration = this.calculateAnimationDuration(speed);
      (wheel as HTMLElement).style.animationDuration = `${duration}s`;
    });
  }

  calculateAnimationDuration(speed: number): number {
    const minSpeed = 70;
    const maxSpeed = 140;
    const minDuration = 0.28; // Fastest spin at maxSpeed
    const maxDuration = 0.8; // Slowest spin at minSpeed
  
    const proportion = (speed - minSpeed) / (maxSpeed - minSpeed);
  
    const duration = maxDuration - (maxDuration - minDuration) * proportion;
  
    return duration;
  }
}