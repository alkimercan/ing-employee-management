import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import '../src/components/ing-employee-list.js';

// Mock Redux store
import { store } from '../src/services/store.js';

describe('IngEmployeeList', () => {
  let element;
  
  beforeEach(async () => {
    element = await fixture(html`<ing-employee-list></ing-employee-list>`);
  });
  
  it('renders the employee list component', () => {
    const container = element.shadowRoot.querySelector('.employee-list-container');
    expect(container).to.exist;
  });
  
  it('displays view mode controls', () => {
    const viewControls = element.shadowRoot.querySelector('.view-controls');
    expect(viewControls).to.exist;
    
    const buttons = viewControls.querySelectorAll('button');
    expect(buttons.length).to.equal(2);
  });
  
  it('displays search input', () => {
    const searchInput = element.shadowRoot.querySelector('.search-input');
    expect(searchInput).to.exist;
  });
  
  it('should change view mode when buttons are clicked', async () => {
    const tableButton = element.shadowRoot.querySelector('.view-controls button:first-child');
    const cardButton = element.shadowRoot.querySelector('.view-controls button:last-child');
    
    // Default should be table view
    expect(element.viewMode).to.equal('table');
    
    // Click on card view button
    cardButton.click();
    await element.updateComplete;
    expect(element.viewMode).to.equal('card');
    
    // Click on table view button
    tableButton.click();
    await element.updateComplete;
    expect(element.viewMode).to.equal('table');
  });
  
  it('displays employees from the store', () => {
    const state = store.getState();
    expect(element.employees.length).to.equal(state.employees.length);
  });
  
  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
}); 