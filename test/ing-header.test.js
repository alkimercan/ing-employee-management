import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import '../src/components/ing-header.js';

describe('IngHeader', () => {
  let element;
  
  beforeEach(async () => {
    element = await fixture(html`<ing-header></ing-header>`);
  });
  
  it('renders with the correct structure', () => {
    const container = element.shadowRoot.querySelector('.header-container');
    expect(container).to.exist;
    
    const logo = element.shadowRoot.querySelector('.logo');
    expect(logo).to.exist;
    
    const title = element.shadowRoot.querySelector('h1');
    expect(title).to.exist;
    expect(title.textContent).to.include('Employee Management System');
  });
  
  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
}); 