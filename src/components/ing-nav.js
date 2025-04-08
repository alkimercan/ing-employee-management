import { LitElement, html, css } from 'lit';
import { I18nMixin } from '../i18n/i18n-service.js';

export class IngNav extends I18nMixin(LitElement) {
  static styles = css`
    :host {
      display: block;
      background-color: #333;
      color: white;
      border-bottom: 1px solid #444;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    nav {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: flex-start;
      position: relative;
    }
    
    .nav-item {
      padding: 16px 24px;
      text-decoration: none;
      color: white;
      font-weight: bold;
      transition: all 0.3s;
      position: relative;
      font-size: 14px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    
    .nav-item:hover {
      background-color: #444;
    }
    
    .nav-item::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 3px;
      background-color: #ff6200;
      transition: width 0.3s;
    }
    
    .nav-item:hover::after {
      width: 100%;
    }
    
    .nav-item.active {
      background-color: #444;
    }
    
    .nav-item.active::after {
      width: 100%;
    }
    
    @media (max-width: 600px) {
      nav {
        flex-direction: column;
      }
      
      .nav-item {
        padding: 14px 20px;
        border-bottom: 1px solid #444;
      }
      
      .nav-item:last-child {
        border-bottom: none;
      }
    }
  `;

  constructor() {
    super();
    this._boundLocationChanged = this._locationChanged.bind(this);
  }
  
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('vaadin-router-location-changed', this._boundLocationChanged);
    // Initial active state check
    this._locationChanged();
  }
  
  disconnectedCallback() {
    window.removeEventListener('vaadin-router-location-changed', this._boundLocationChanged);
    super.disconnectedCallback();
  }
  
  _locationChanged() {
    this.requestUpdate();
  }
  
  _isActive(path) {
    const currentPath = window.location.pathname;
    return currentPath === path;
  }

  render() {
    return html`
      <nav>
        <a href="/" class="nav-item ${this._isActive('/') ? 'active' : ''}">
          ${this.t('employee_list')}
        </a>
        <a href="/add" class="nav-item ${this._isActive('/add') ? 'active' : ''}">
          ${this.t('add_employee')}
        </a>
      </nav>
    `;
  }
}

customElements.define('ing-nav', IngNav); 