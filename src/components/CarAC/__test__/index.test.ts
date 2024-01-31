import { CarAC } from "..";
import { CarRange } from "../../CarRange";
import domElements from "../../../helpers/DomElements";

describe('CarAC', () => {
  let carAC: CarAC;
  let carRange: CarRange;

  beforeEach(() => {
    carRange = new CarRange();
    carAC = new CarAC(carRange);
  });

  test('updateACState updates AC state correctly', () => {
    if (domElements.acElement && domElements.acImageElement && domElements.acBoxElement) {
      carAC.updateACState(10, true);
      expect(domElements.acElement.textContent).toBe('HEAT ON');
      expect(domElements.acImageElement.src).toContain('icon-wave-white.svg');
      expect(domElements.acBoxElement.classList.contains('heat-active')).toBe(true);
  
      carAC.updateACState(20, true);
      expect(domElements.acElement.textContent).toBe('AC ON');
      expect(domElements.acImageElement.src).toContain('icon-fan-white.svg');
      expect(domElements.acBoxElement.classList.contains('ac-active')).toBe(true);
  
      carAC.updateACState(10, false);
      expect(domElements.acElement.textContent).toBe('HEAT OFF');
      expect(domElements.acImageElement.src).toContain('icon-wave-gray.svg');
      expect(domElements.acBoxElement.classList.contains('heat-active')).toBe(false); 
    }
  });

  test('toggleAC toggles AC state correctly', () => {
    if (domElements.acElement && domElements.tempElement) {
      domElements.tempElement.textContent = '10';
      domElements.acElement.textContent = 'HEAT OFF';
      carAC.toggleAC();
      expect(domElements.acElement.textContent).toBe('HEAT ON');
  
      domElements.tempElement.textContent = '20';
      domElements.acElement.textContent = 'AC OFF';
      carAC.toggleAC();
      expect(domElements.acElement.textContent).toBe('AC ON');
  
      domElements.tempElement.textContent = '10';
      domElements.acElement.textContent = 'HEAT ON';
      carAC.toggleAC();
      expect(domElements.acElement.textContent).toBe('HEAT OFF');
    }
  });
});