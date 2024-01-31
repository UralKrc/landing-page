import domElements, { DOMElements } from "../../helpers/DomElements";

export class Header {
  domElements: DOMElements;

  constructor() {
    this.toggle = this.toggle.bind(this);
    this.domElements = domElements;
    this.bindEvents();
  }

  toggle() {
    const header = document.querySelector(".header") as HTMLElement;
  
    if (header) {
      header.classList.toggle("active");
    };
  }

  bindEvents(): void {
    this.domElements.menuElement?.addEventListener('click', () => this.toggle());
  }
}

export const header = new Header();