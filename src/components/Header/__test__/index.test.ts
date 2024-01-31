import { Header } from "..";

describe('Header', () => {
  let header: Header;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="header"></div>
      <div class="hamburger"></div>
    `;
    header = new Header();
  });

  it('should be defined', () => {
    expect(Header).toBeDefined();
  });

  it('should create a new instance', () => {
    expect(header).toBeInstanceOf(Header);
  });

  it('should toggle header class', () => {
    const headerElement = document.querySelector('.header') as HTMLElement;

    header.toggle();
    expect(headerElement.classList.contains('active')).toBe(true);

    header.toggle();
    expect(headerElement.classList.contains('active')).toBe(false);
  });
});