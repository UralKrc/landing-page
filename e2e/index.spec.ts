import { test, expect } from '@playwright/test';

test.describe('Tesla Range Calculator', () => {
  test.beforeEach(async ({ page }) => {
    // Go to your page before each test
    await page.goto('http://localhost:5173');
  });
  
  test('Check navigation menu items', async ({ page }) => {
    // Define the expected menu items
    const expectedMenuItems = ['Model S', 'Model X', 'Model 3', 'Roadster', 'Energy'];
  
    // Get the actual menu items
    const actualMenuItems = await page.$$eval('.menu-item a', items => items.map(item => item.textContent));
  
    // Check if the actual menu items match the expected ones
    for (let i = 0; i < expectedMenuItems.length; i++) {
      expect(actualMenuItems[i]).toBe(expectedMenuItems[i]);
    }
  
    await page.setViewportSize({ width: 375, height: 667 });
  
    // Click the hamburger button
    await page.click('.hamburger');
  
    // Check if the navigation menu is visible
    const navigation = await page.$('.navigation');
    const isVisible = await navigation?.isVisible();
    expect(isVisible).toBe(true);
  
    // Check if the correct number of menu items is rendered
    const menuItems = await page.$$('.menu-item');
    expect(menuItems.length).toBe(5);
  });
  
  test('Check landing section elements', async ({ page }) => {
    // Check if the title exists and has the correct text
    const title = await page.textContent('.landing-title');
    expect(title?.trim()).toBe('Far far away, behind the word mountains...');
  
    // Check if the subtitle exists and has the correct text
    const subtitle = await page.textContent('.landing-subtitle');
    let cleanedSubtitle = subtitle?.replace(/[\n\r]+/g, ' ').trim();
    cleanedSubtitle = cleanedSubtitle?.replace(/\s\s+/g, ' ');
    expect(cleanedSubtitle).toBe('A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.');
  
    // Check if the arrow icon exists
    const arrowIcon = await page.$('.arrow-icon');
    expect(arrowIcon).not.toBeNull();
  });
  
  test('Check speed calculator', async ({ page }) => {
    // Click the increase button
    await page.click('.grid-box.speed .button.increase');
  
    // Check if the calculator-text has been increased
    let calculatorText = await page.textContent('.grid-box.speed .calculator-text');
    expect(calculatorText).toBe('110 KMH');
  
    // Click the decrease button
    await page.click('.grid-box.speed .button.decrease');
  
    // Check if the calculator-text has been decreased
    calculatorText = await page.textContent('.grid-box.speed .calculator-text');
    expect(calculatorText).toBe('100 KMH');
  });
  
  test('Check AC toggle', async ({ page }) => {
    // Click the AC toggle button
    await page.click('.grid-box.ac .ac-toggle');
  
    // Check if the ac-text has been updated
    let acText = await page.textContent('.grid-box.ac .ac-text');
    expect(acText).toBe('AC ON');
  
    // Check if the image source has been updated
    let imgSrc = await page.getAttribute('.grid-box.ac .ac-toggle img', 'src');
    expect(imgSrc).toBe('/src/assets/images/icon-fan-white.svg');
  
    // Check if the ac-toggle has a blue background and white text
    let acToggleStyle = await page.evaluate(() => {
      const acToggle = document.querySelector('.grid-box.ac .ac-toggle');
      if (acToggle !== null) {
        return {
          backgroundColor: window.getComputedStyle(acToggle).backgroundColor,
          color: window.getComputedStyle(acToggle).color
        };
      } else {
        return null;
      }
    });
    expect(acToggleStyle?.backgroundColor).toBe('rgb(0, 141, 255)');
    expect(acToggleStyle?.color).toBe('rgb(255, 255, 255)');
  });
  
  test('Check wheel images', async ({ page }) => {
    // Click the wheels-21 option
    await page.click('.wheel-21');
  
    // Check if the car-wheel images have been updated
    let wheelImageWidth = await page.evaluate(() => {
      const carWheel = document.querySelector('.car-wheel');
      const parentElement = carWheel ? carWheel.parentElement : null;
      if (carWheel && parentElement) {
        const carWheelWidth = parseFloat(window.getComputedStyle(carWheel).width);
        const parentWidth = parseFloat(window.getComputedStyle(parentElement).width);
        const widthPercentage = (carWheelWidth / parentWidth) * 100;
        return `${widthPercentage.toFixed(1)}%`;
      }
      return null;
    });
    expect(wheelImageWidth).toBe('9.7%');
  });
  
  
  test('Check calculator section elements', async ({ page }) => {
    // Check if the section is rendered
    const calculatorSection = await page.$('.calculator-section');
    expect(calculatorSection).not.toBeNull();
  
    // Check if the correct number of images is rendered
    const images = await page.$$('.calculator-section img');
    expect(images.length).toBe(9);
  
    // Check if the correct number of buttons is rendered
    const buttons = await page.$$('.calculator-section button');
    expect(buttons.length).toBe(7);
  
    // Check if the correct number of text elements is rendered
    const textElements = await page.$$('.calculator-section .calculator-text');
    expect(textElements.length).toBe(4);
  
    // Check if the correct range values are rendered
    const range100D = await page.textContent('.range-100D');
    expect(range100D).toBe('594');
    const rangeP100D = await page.textContent('.range-P100D');
    expect(rangeP100D).toBe('572');
  });
  
  test('Check information section elements', async ({ page }) => {
    // Check if the section is rendered
    const informationSection = await page.$('.information-section');
    expect(informationSection).not.toBeNull();
  
    // Check if the text is correct
    let informationText: string | null = await page.textContent('.information-section .information-text');
  
    if (informationText !== null) {
      informationText = informationText.replace(/[\n\r]+/g, ' ').trim();
      informationText = informationText.replace(/\s\s+/g, ' ');
    }
    expect(informationText).toBe('The actual amount of range that you experience will vary based on your particular use conditions. Your vehicle range is also dependent on other conditions, such as vehicle configuration, battery age and condition, driving style and operating, environmental and climate conditions. See how some of these particular use conditions may affect your range in our simulation model.');
  });
  
  test('Check footer elements', async ({ page }) => {
    // Check if the footer is rendered
    const footer = await page.$('.footer');
    expect(footer).not.toBeNull();
  
    // Check if the correct number of footer menus is rendered
    const footerMenus = await page.$$('.footer-menu');
    expect(footerMenus.length).toBe(4);
  
    // Check if the email form is rendered
    const emailForm = await page.$('.email-form');
    expect(emailForm).not.toBeNull();
  
    // Check if the email input is rendered
    const emailInput = await page.$('.email-input');
    expect(emailInput).not.toBeNull();
  
    // Check if the email button is rendered
    const emailButton = await page.$('.email-button');
    expect(emailButton).not.toBeNull();
  });
});
