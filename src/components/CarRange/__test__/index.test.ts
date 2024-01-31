import { CarRange } from "..";
import domElements from "../../../helpers/DomElements";

describe('CarRange', () => {
  let carRange: CarRange;

  beforeEach(() => {
    // Mock domElements
    domElements.data100D = [{
      "temp": -10,
      "wheelsize": 19,
      "ac": "off",
      "hwy": [
        { "kmh": 70, "kilometers": 798 },
        { "kmh": 80, "kilometers": 710 },
        { "kmh": 90, "kilometers": 627 },
        { "kmh": 100, "kilometers": 555 },
        { "kmh": 110, "kilometers": 491 },
        { "kmh": 120, "kilometers": 435 },
        { "kmh": 130, "kilometers": 386 },
        { "kmh": 140, "kilometers": 338 }
      ]
    }];

    domElements.dataP100D = [{
      "temp": -10,
      "wheelsize": 19,
      "ac": "off",
      "hwy": [
        { "kmh": 70, "kilometers": 760 },
        { "kmh": 80, "kilometers": 678 },
        { "kmh": 90, "kilometers": 602 },
        { "kmh": 100, "kilometers": 533 },
        { "kmh": 110, "kilometers": 471 },
        { "kmh": 120, "kilometers": 417 },
        { "kmh": 130, "kilometers": 369 },
        { "kmh": 140, "kilometers": 326 }
      ]
    }];

    domElements.rangeElement100D = document.createElement('div');
    domElements.rangeElementP100D = document.createElement('div');
    domElements.speedElement = document.createElement('div');
    domElements.tempElement = document.createElement('div');
    domElements.acElement = document.createElement('div');

    // Create a div element and add it to the document
    const divElement = document.createElement('div');
    document.body.appendChild(divElement);

    domElements.wheelElement = document.querySelectorAll('div');

    domElements.speedElement.textContent = '100';
    domElements.tempElement.textContent = '-10';
    domElements.acElement.textContent = 'AC OFF';
    domElements.wheelElement[0].textContent = '19';
    domElements.wheelElement[0].parentElement?.classList.add('active');
  
    carRange = new CarRange();
  });

  it('updates the range values', () => {
    carRange.updateValues();

    expect(domElements.rangeElement100D?.textContent).toBe('555');
    expect(domElements.rangeElementP100D?.textContent).toBe('533');
  });
});