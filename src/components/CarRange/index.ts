import domElements, { DOMElements } from "../../helpers/DomElements";
import { CarData } from "../Car/type";

export type HwyData = {
  kmh: number;
  kilometers: number;
}

export class CarRange {
  domElements: DOMElements;

  constructor() {
    this.domElements = domElements;
  }

  updateValues(): void {
    this.updateRange(this.domElements.data100D, this.domElements.rangeElement100D);
    this.updateRange(this.domElements.dataP100D, this.domElements.rangeElementP100D);
  }

  updateRange(data: CarData[], rangeElement: HTMLElement | null): void {
    let range = this.calculateRange(data);

    if (rangeElement) {
      rangeElement.textContent = `${range}`;
    }
  }
  
  calculateRange(data: CarData[]): number {
    const AC_ON = 'AC ON';
    const HEAT_ON = 'HEAT ON';
    const ON = 'on';
    const OFF = 'off';
    
    const speedText = this.domElements.speedElement?.textContent;
    const tempText = this.domElements.tempElement?.textContent;
    const acText = this.domElements.acElement?.textContent;
    
    const speed = speedText ? parseInt(speedText) : 0;
    const temp = tempText ? parseInt(tempText) : 0;
    const ac = acText === AC_ON || acText === HEAT_ON ? ON : OFF;
    const activeWheelElement = Array.from(this.domElements.wheelElement).find(el => el.parentElement?.classList.contains('active'));
    const wheelSize = activeWheelElement ? parseInt(activeWheelElement.textContent || '0') : 0;
    const filteredData = data.filter(d => d && d.temp === temp && d.wheelsize === wheelSize && d.ac === ac);
    
    if (filteredData.length === 0) {
      console.error('No data matches the current filter criteria');
      return 0;
    }
    
    const hwyData = this.findHwyData(filteredData, speed);
    return hwyData ? hwyData.kilometers : 0;
  }

  findHwyData(data: CarData[], speed: number): HwyData | null {
    for (const item of data) {
      const hwyData = item.hwy.find((h: HwyData) => h.kmh === speed);
      if (hwyData) {
        return hwyData;
      }
    }
  
    console.error('No hwy data matches the current speed');
    return null;
  }
}