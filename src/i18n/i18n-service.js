import { translations } from './translations.js';

class I18nService {
  constructor() {
    this._language = document.documentElement.lang || 'en';
    this._translations = translations;
  }
  
  get language() {
    return this._language;
  }
  
  set language(lang) {
    if (this._translations[lang]) {
      this._language = lang;
      document.documentElement.lang = lang;
      
      // Dispatch an event to notify all components of language change
      window.dispatchEvent(new CustomEvent('language-changed', {
        detail: { language: lang }
      }));
    } else {
      console.warn(`Language ${lang} is not supported`);
    }
  }
  
  translate(key) {
    const translations = this._translations[this._language];
    if (!translations) {
      return key;
    }
    
    return translations[key] || key;
  }
  
  // Shorthand method for translate
  t(key) {
    return this.translate(key);
  }
}

// Create a singleton instance
export const i18n = new I18nService();

// Create a mixin that can be used with LitElement components
export const I18nMixin = (superClass) => class extends superClass {
  constructor() {
    super();
    this._i18n = i18n;
    
    // Bind the handleLanguageChanged method to this instance
    this._boundHandleLanguageChanged = this._handleLanguageChanged.bind(this);
  }
  
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('language-changed', this._boundHandleLanguageChanged);
  }
  
  disconnectedCallback() {
    window.removeEventListener('language-changed', this._boundHandleLanguageChanged);
    super.disconnectedCallback();
  }
  
  _handleLanguageChanged() {
    this.requestUpdate();
  }
  
  // Shorthand for translations
  t(key) {
    return this._i18n.translate(key);
  }
}; 