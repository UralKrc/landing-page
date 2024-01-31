import { CarState } from "..";
import { CarAnimation } from "../../CarAnimation";
import { CarAC } from "../../CarAC";
import { CarRange } from "../../CarRange";
import domElements from "../../../helpers/DomElements";

jest.mock("../../CarAnimation");
jest.mock("../../CarAC");
jest.mock("../../CarRange");
jest.mock("../../../helpers/DomElements");

describe('CarState', () => {
  let carState: CarState;
  let carAnimation: CarAnimation;
  let carRange: CarRange;
  let carAC: CarAC;
  let speedElement: HTMLElement;
  let tempElement: HTMLElement;
  let acElement: HTMLElement;

  beforeEach(() => {
    carAnimation = new CarAnimation();
    carRange = new CarRange();
    carAC = new CarAC(carRange);
    carState = new CarState(carAnimation, carRange, carAC);
    speedElement = document.createElement('div');
    tempElement = document.createElement('div');
    acElement = document.createElement('div');
    domElements.speedElement = speedElement;
    domElements.tempElement = tempElement;
    domElements.acElement = acElement;
  });

  it('should update speed correctly when delta is positive', () => {
    speedElement.textContent = '70 KMH';
    carState.updateSpeed(10);
    expect(speedElement.textContent).toBe('80 KMH');
  });

  it('should update speed correctly when delta is negative', () => {
    speedElement.textContent = '100 KMH';
    carState.updateSpeed(-10);
    expect(speedElement.textContent).toBe('90 KMH');
  });

  it('should not exceed speedMaxLimit', () => {
    speedElement.textContent = '140 KMH';
    carState.updateSpeed(10);
    expect(speedElement.textContent).toBe('140 KMH');
  });

  it('should not go below speedMinLimit', () => {
    speedElement.textContent = '70 KMH';
    carState.updateSpeed(-10);
    expect(speedElement.textContent).toBe('70 KMH');
  });

  it('should update temperature correctly when delta is positive', () => {
    tempElement.textContent = '20°';
    acElement.textContent = 'AC ON';
    carState.updateTemp(10);
    expect(tempElement.textContent).toBe('30°');
  });

  it('should update temperature correctly when delta is negative', () => {
    tempElement.textContent = '20°';
    acElement.textContent = 'HEAT ON';
    carState.updateTemp(-10);
    expect(tempElement.textContent).toBe('10°');
  });

  it('should not exceed tempMaxLimit', () => {
    tempElement.textContent = '30°';
    acElement.textContent = 'AC ON';
    carState.updateTemp(10);
    expect(tempElement.textContent).toBe('40°');
  });

  it('should not go below tempMinLimit', () => {
    tempElement.textContent = '10°';
    acElement.textContent = 'HEAT ON';
    carState.updateTemp(-10);
    expect(tempElement.textContent).toBe('0°');
  });
});