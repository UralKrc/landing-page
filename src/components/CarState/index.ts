import { CarAnimation } from "../CarAnimation";
import { CarAC } from "../CarAC";
import { CarRange } from "../CarRange";
import domElements, { DOMElements } from "../../helpers/DomElements";

export class CarState {
  private _speedMinLimit: number;
  private _speedMaxLimit: number;
  private _tempMinLimit: number;
  private _tempMaxLimit: number;
  carAnimation: CarAnimation;
  carRange: CarRange;
  carAC: CarAC;
  domElements: DOMElements;

  constructor(carAnimation: CarAnimation, carRange: CarRange, carAC: CarAC) {
    this.carAnimation = carAnimation;
    this.carRange = carRange;
    this.carAC = carAC;
    this.domElements = domElements;
    this._speedMinLimit = 70;
    this._speedMaxLimit = 140;
    this._tempMinLimit = -10;
    this._tempMaxLimit = 40;
    this.bindEvents();
  }
  get speedMinLimit(): number {
    return this._speedMinLimit;
  }

  set speedMinLimit(value: number) {
    this._speedMinLimit = value;
  }

  get speedMaxLimit(): number {
    return this._speedMaxLimit;
  }

  set speedMaxLimit(value: number) {
    this._speedMaxLimit = value;
  }

  get tempMinLimit(): number {
    return this._tempMinLimit;
  }

  set tempMinLimit(value: number) {
    this._tempMinLimit = value;
  }

  get tempMaxLimit(): number {
    return this._tempMaxLimit;
  }

  set tempMaxLimit(value: number) {
    this._tempMaxLimit = value;
  }
  
  bindEvents(): void {
    this.domElements.speedIncrease?.addEventListener('click', () => this.updateSpeed(10));
    this.domElements.speedDecrease?.addEventListener('click', () => this.updateSpeed(-10));
    this.domElements.tempIncrease?.addEventListener('click', () => this.updateTemp(10));
    this.domElements.tempDecrease?.addEventListener('click', () => this.updateTemp(-10));
    this.domElements.wheel19?.addEventListener('click', () => this.setWheelSize(19));
    this.domElements.wheel21?.addEventListener('click', () => this.setWheelSize(21));
  }

  updateSpeed(delta: number): void {
    if (this.domElements.speedElement) {
      let speed = parseInt(this.domElements.speedElement.textContent || '0');
      speed = delta > 0 ? Math.min(speed + delta, this.speedMaxLimit) : Math.max(speed + delta, this.speedMinLimit);
      this.domElements.speedElement.textContent = `${speed}`;
      this.domElements.rangeElements?.forEach((element: Element) => {
        element.classList.remove('slide-up');
        void (element as HTMLElement).offsetWidth;
      });
      this.domElements.rangeElements?.forEach((element: Element) => {
        element.classList.add('slide-up');
      });
      this.carAnimation.setWheelAnimationDuration(speed);
      this.carRange.updateValues();
  
      this.updateButtonState('.speed', speed, this.speedMinLimit, this.speedMaxLimit);
    }
  }
  
  updateTemp(delta: number): void {
    if (this.domElements.tempElement && this.domElements.acElement?.textContent) {
      let temp = parseInt(this.domElements.tempElement.textContent || '0');
      temp = delta > 0 ? Math.min(temp + delta, this.tempMaxLimit) : Math.max(temp + delta, this.tempMinLimit);
      this.domElements.tempElement.textContent = `${temp}\u00B0`;
      this.domElements.rangeElements?.forEach((element: Element) => {
        element.classList.remove('slide-up');
        void (element as HTMLElement).offsetWidth;
      });
      this.domElements.rangeElements?.forEach((element: Element) => {
        element.classList.add('slide-up');
      });
      this.carAC.updateACState(temp, this.domElements.acElement.textContent.includes('ON'));
      this.carRange.updateValues();
  
      this.updateButtonState('.temp', temp, this.tempMinLimit, this.tempMaxLimit);
    }
  }
  
  setWheelSize(size: number): void {
    this.domElements.wheelElement.forEach(el => {
      el.parentElement?.classList.remove('active');
      this.domElements.rangeElements?.forEach((element: Element) => {
        element.classList.remove('slide-up');
        void (element as HTMLElement).offsetWidth;
      });
      this.domElements.rangeElements?.forEach((element: Element) => {
        element.classList.add('slide-up');
      });
      if (el.textContent === `${size}"`) {
        el.parentElement?.classList.add('active');
        this.domElements.rangeElements?.forEach((element: Element) => {
          element.classList.add('slide-up');
        });
      }
    });
  
    const carWheelImages = document.querySelectorAll('.car-wheel');
    carWheelImages.forEach(imgParent => {
      imgParent.classList.toggle('size-21', size === 21);
    });
    this.carRange.updateValues();
  }
  
  updateButtonState(selector: string, value: number, minLimit: number, maxLimit: number): void {
    const increaseButton = document.querySelector(`${selector} .increase`) as HTMLElement;
    const decreaseButton = document.querySelector(`${selector} .decrease`) as HTMLElement;
  
    if (increaseButton) {
      if (value >= maxLimit) {
        increaseButton.classList.add('disabled');
      } else {
        increaseButton.classList.remove('disabled');
      }
    }
  
    if (decreaseButton) {
      if (value <= minLimit) {
        decreaseButton.classList.add('disabled');
      } else {
        decreaseButton.classList.remove('disabled');
      }
    }
  }
}