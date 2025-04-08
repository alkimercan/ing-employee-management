import { LitElement, html, css } from 'lit';
import { I18nMixin } from '../i18n/i18n-service.js';

export class IngConfirmationDialog extends I18nMixin(LitElement) {
  static styles = css`
    :host {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    
    :host([open]) {
      display: flex;
      opacity: 1;
    }
    
    .dialog {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
      width: 90%;
      max-width: 400px;
      padding: 28px;
      transform: translateY(20px);
      transition: transform 0.3s ease;
      animation: slide-up 0.3s forwards;
    }
    
    @keyframes slide-up {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    .dialog-header {
      margin-bottom: 16px;
      font-size: 1.3rem;
      font-weight: bold;
      color: #ff6200;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .header-icon {
      font-size: 24px;
    }
    
    .dialog-content {
      margin-bottom: 28px;
      font-size: 15px;
      line-height: 1.5;
      color: #555;
    }
    
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .primary {
      background-color: #ff6200;
      color: white;
    }
    
    .primary:hover {
      background-color: #e55a00;
      transform: translateY(-1px);
    }
    
    .secondary {
      background-color: #e0e0e0;
      color: #333;
    }
    
    .secondary:hover {
      background-color: #d0d0d0;
    }
  `;

  static properties = {
    open: { type: Boolean, reflect: true },
    title: { type: String },
    message: { type: String },
    confirmText: { type: String },
    cancelText: { type: String },
  };

  constructor() {
    super();
    this.open = false;
    this.title = '';
    this.message = '';
    this.confirmText = 'proceed';
    this.cancelText = 'cancel';
  }

  /**
   * Show the confirmation dialog
   * @param {Object} options - Dialog options
   * @param {string} [options.title] - Dialog title
   * @param {string} [options.message] - Dialog message
   * @param {string} [options.confirmText] - Text for confirm button
   * @param {string} [options.cancelText] - Text for cancel button
   * @returns {Promise<boolean>} Promise that resolves to true if confirmed, false otherwise
   */
  show(options = {}) {
    this.title = options.title || this.title;
    this.message = options.message || this.message;
    this.confirmText = options.confirmText || this.confirmText;
    this.cancelText = options.cancelText || this.cancelText;
    this.open = true;
    
    // Using window.Promise to explicitly reference the global Promise constructor
    return new window.Promise((resolve) => {
      this._resolvePromise = resolve;
    });
  }
  
  hide() {
    this.open = false;
  }
  
  _onConfirm() {
    this.hide();
    if (this._resolvePromise) {
      this._resolvePromise(true);
      this._resolvePromise = null;
    }
  }
  
  _onCancel() {
    this.hide();
    if (this._resolvePromise) {
      this._resolvePromise(false);
      this._resolvePromise = null;
    }
  }

  render() {
    return html`
      <div class="dialog">
        <div class="dialog-header">
          <span class="header-icon">⚠️</span>
          ${this.title || this.t('confirm')}
        </div>
        <div class="dialog-content">${this.message}</div>
        <div class="dialog-actions">
          <button class="secondary" @click=${this._onCancel}>
            ${this.t(this.cancelText)}
          </button>
          <button class="primary" @click=${this._onConfirm}>
            ${this.t(this.confirmText)}
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('ing-confirmation-dialog', IngConfirmationDialog); 