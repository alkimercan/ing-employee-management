import { LitElement, html, css } from 'lit';
import { I18nMixin } from '../i18n/i18n-service.js';

export class IngHeader extends I18nMixin(LitElement) {
  static styles = css`
    :host {
      display: block;
      background-color: #cc4e00;
      color: white;
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .header-container {
      display: flex;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      justify-content: space-between;
    }
    
    .left-section {
      display: flex;
      align-items: center;
    }
    
    .logo {
      font-size: 24px;
      font-weight: bold;
      margin-right: 20px;
      display: flex;
      align-items: center;
    }
    
    .logo-icon {
      width: 40px;
      height: 40px;
      background-color: white;
      border-radius: 8px;
      margin-right: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #cc4e00;
      font-weight: bold;
      font-size: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    h1 {
      margin: 0;
      font-size: 22px;
      letter-spacing: 0.5px;
    }
    
    .right-section {
      display: flex;
      align-items: center;
    }
    
    .lang-switch {
      background: transparent;
      border: 1px solid white;
      color: white;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      margin-left: 10px;
      background-color: rgba(0, 0, 0, 0.3);
    }
    
    .lang-switch:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    
    .lang-switch:focus-visible {
      outline: 2px solid white;
      outline-offset: 2px;
    }
    
    @media (max-width: 600px) {
      .header-container {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .right-section {
        margin-top: 10px;
        align-self: flex-end;
      }
      
      h1 {
        font-size: 18px;
      }
      
      .logo-icon {
        width: 32px;
        height: 32px;
        font-size: 16px;
      }
    }
  `;

  constructor() {
    super();
  }
  
  _toggleLanguage() {
    const newLang = this._i18n.language === 'en' ? 'tr' : 'en';
    this._i18n.language = newLang;
  }

  render() {
    return html`
      <div class="header-container">
        <div class="left-section">
          <div class="logo">
            <div class="logo-icon" role="img" aria-label="ING Logo">ING</div>
          </div>
          <h1>${this.t('app_title')}</h1>
        </div>
        
        <div class="right-section">
          <button 
            class="lang-switch" 
            @click=${this._toggleLanguage}
            aria-label="${this.t('switch_to')} ${this._i18n.language === 'en' ? 'Türkçe' : 'English'}"
          >
            ${this._i18n.language === 'en' ? 'TR' : 'EN'}
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('ing-header', IngHeader); 