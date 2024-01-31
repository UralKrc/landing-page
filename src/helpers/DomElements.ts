import { CarData } from "../components/Car/type";
import data100D from "../data/metric-100D.json";
import dataP100D from "../data/metric-P100D.json";


export class DOMElements {
  menuElement: HTMLElement | null;
  speedElement: HTMLElement | null;
  speedIncrease: HTMLElement | null;
  speedDecrease: HTMLElement | null;
  tempElement: HTMLElement | null;
  tempIncrease: HTMLElement | null;
  tempDecrease: HTMLElement | null;
  acElement: HTMLElement | null;
  acBoxElement: HTMLElement | null;
  acImageElement: HTMLImageElement | null;
  wheelElement: NodeListOf<Element>;
  wheel19: HTMLElement | null;
  wheel21: HTMLElement | null;
  carWheelImages: NodeListOf<Element>;
  carWheels: NodeListOf<Element>;
  rangeElement100D: HTMLElement | null;
  rangeElementP100D: HTMLElement | null;
  rangeElements: NodeListOf<Element>;
  data100D: CarData[];
  dataP100D: CarData[];

  constructor() {
    this.menuElement = document.querySelector('.hamburger');
    this.speedElement = document.querySelector('.speed .calculator-text');
    this.speedIncrease = document.querySelector('.speed .increase');
    this.speedDecrease = document.querySelector('.speed .decrease');
    this.tempElement = document.querySelector('.temp .calculator-text');
    this.tempIncrease = document.querySelector('.temp .increase');
    this.tempDecrease = document.querySelector('.temp .decrease');
    this.acElement = document.querySelector('.ac-toggle .ac-text');
    this.acBoxElement = document.querySelector('.ac-toggle');
    this.acImageElement = this.acBoxElement && this.acBoxElement.querySelector('img');
    this.wheelElement = document.querySelectorAll('.wheels .calculator-text');
    this.wheel19 = document.querySelector('.wheel-19');
    this.wheel21 = document.querySelector('.wheel-21');
    this.rangeElement100D = document.querySelector('.range-100D');
    this.rangeElementP100D = document.querySelector('.range-P100D');
    this.rangeElements = document.querySelectorAll('.range');
    this.carWheelImages = document.querySelectorAll('.car-wheel-image');
    this.carWheels = document.querySelectorAll('.car-wheel');
    this.data100D = data100D;
    this.dataP100D = dataP100D;
  }
}

const domElements = new DOMElements();
export default domElements;