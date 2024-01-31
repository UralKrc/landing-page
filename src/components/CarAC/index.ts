import { CarRange } from "../CarRange";
import iconFanWhite from "../../assets/images/icon-fan-white.svg";
import iconWaveGray from "../../assets/images/icon-wave-gray.svg";
import iconWaveWhite from "../../assets/images/icon-wave-white.svg";
import iconFanGray from "../../assets/images/icon-fan-gray.svg";
import domElements, { DOMElements } from "../../helpers/DomElements";

export class CarAC {
  carRange: CarRange;
  domElements: DOMElements;

  constructor(carRange: CarRange) {
    this.carRange = carRange;
    this.domElements = domElements;
    this.bindEvents();
  }

  bindEvents(): void {
    this.domElements.acBoxElement?.addEventListener('click', () => this.toggleAC());
  } 
  
  updateACState(temp: number, isACOn: boolean): void {
    if (this.domElements.acElement && this.domElements.acBoxElement && this.domElements.acImageElement) {
      this.domElements.acBoxElement.classList.remove('ac-active', 'heat-active');
      let acStatus = 'OFF';
      let acMode = 'AC';
      let acImage = iconFanGray;
  
      if (temp <= 10) {
        acMode = 'HEAT';
        if (isACOn) {
          acStatus = 'ON';
          acImage = iconWaveWhite;
          this.domElements.acBoxElement.classList.add('heat-active');
        } else {
          acImage = iconWaveGray;
        }
      } else if (temp >= 20 && isACOn) {
        acStatus = 'ON';
        acImage = iconFanWhite;
        this.domElements.acBoxElement.classList.add('ac-active');
      }
  
      this.domElements.acElement.textContent = `${acMode} ${acStatus}`;
      this.domElements.acImageElement.src = acImage;
    }
  }
  
  toggleAC(): void {
    let temp = parseInt(this.domElements.tempElement?.textContent || '0');
    let ac = this.domElements.acElement?.textContent || '';
    let isACOn = ac.includes('OFF');
    this.domElements.rangeElements?.forEach((element: Element) => {
      element.classList.remove('slide-up');
      void (element as HTMLElement).offsetWidth;
    });
    this.domElements.rangeElements?.forEach((element: Element) => {
      element.classList.add('slide-up');
    });
    this.updateACState(temp, isACOn);
    this.carRange.updateValues();
  }
}