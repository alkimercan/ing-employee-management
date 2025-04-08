import { LitElement, html, css } from 'lit';
import { I18nMixin } from '../i18n/i18n-service.js';
import { ValidationService } from '../services/validation-service.js';
import { store, addEmployee, updateEmployee, getEmployeeById } from '../services/store.js';
import { navigateToHome } from '../routes/router-config.js';
import './ing-confirmation-dialog.js';

export class IngEmployeeForm extends I18nMixin(LitElement) {
  static styles = css`
    :host {
      display: block;
    }
    
    .form-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
      padding: 30px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    h2 {
      color: #333;
      margin-top: 0;
      margin-bottom: 30px;
      font-size: 1.6rem;
      position: relative;
      padding-bottom: 12px;
    }
    
    h2::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background-color: #cc4e00;
    }
    
    .form-row {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .form-group {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    label {
      font-weight: 600;
      margin-bottom: 8px;
      color: #555;
      font-size: 14px;
    }
    
    input, select {
      padding: 12px 16px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 15px;
      background-color: #f9f9f9;
      transition: all 0.3s;
    }
    
    input:focus, select:focus {
      outline: none;
      border-color: #cc4e00;
      background-color: white;
      box-shadow: 0 0 0 3px rgba(204, 78, 0, 0.1);
    }
    
    input.has-error, select.has-error {
      border-color: #F44336;
      background-color: rgba(244, 67, 54, 0.03);
    }
    
    input.has-error:focus, select.has-error:focus {
      box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
    }
    
    .error {
      color: #F44336;
      margin-top: 6px;
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 5px;
      background-color: rgba(244, 67, 54, 0.08);
      padding: 6px 10px;
      border-radius: 4px;
      border-left: 3px solid #F44336;
    }
    
    .error-icon {
      font-size: 16px;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      align-items: center;
    }
    
    button {
      padding: 0 24px;
      border: none;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      min-width: 120px;
      justify-content: center;
      text-align: center;
      line-height: normal;
      position: relative;
      height: 40px;
      box-sizing: border-box;
      vertical-align: middle;
      overflow: hidden;
      white-space: nowrap;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    }
    
    button span {
      display: inline-block;
      vertical-align: middle;
      line-height: 1;
      position: relative;
    }
    
    .primary {
      background-color: #cc4e00;
      color: white;
    }
    
    .primary:hover {
      background-color: #b34700;
      transform: translateY(-1px);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
    
    .secondary {
      background-color: #e0e0e0;
      color: #333;
    }
    
    .secondary:hover {
      background-color: #d0d0d0;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
    
    .btn-icon {
      font-size: 14px;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      text-align: center;
      position: relative;
    }
    
    select {
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 12px center;
      background-size: 16px;
      padding-right: 40px;
    }
    
    @media (max-width: 768px) {
      .form-container {
        padding: 20px;
      }
      
      .form-row {
        flex-direction: column;
        gap: 16px;
        margin-bottom: 8px;
      }
      
      button {
        padding: 0 16px;
        font-size: 13px;
        height: 38px;
        min-width: 110px;
      }
      
      .form-actions {
        justify-content: center;
      }
    }
  `;

  static properties = {
    employee: { type: Object },
    editMode: { type: Boolean },
    errors: { type: Object }
  };

  constructor() {
    super();
    this.editMode = false;
    this.employee = this._getEmptyEmployee();
    this.errors = {};
  }

  _getEmptyEmployee() {
    return {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: '',
      position: ''
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._checkEditMode();
  }

  _checkEditMode() {
    // Get the ID from the URL if we're in edit mode
    const location = this.getPathname();
    const match = location.match(/\/edit\/(\d+)/);
    
    if (match && match[1]) {
      const employeeId = parseInt(match[1], 10);
      const employeeToEdit = getEmployeeById(employeeId);
      
      if (employeeToEdit) {
        this.editMode = true;
        this.employee = { ...employeeToEdit };
      } else {
        // If employee not found, navigate back to list
        navigateToHome();
      }
    }
  }

  // Test edilebilirliği kolaylaştırmak için ayrı bir metod
  getPathname() {
    return window.location.pathname;
  }

  _handleInputChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    
    this.employee = {
      ...this.employee,
      [field]: value
    };
    
    // Clear error when user types
    if (this.errors[field]) {
      this.errors = {
        ...this.errors,
        [field]: null
      };
    }
  }

  async _handleSubmit(e) {
    e.preventDefault();
    
    // Validate form
    const validationResult = ValidationService.validateEmployeeForm(this.employee);
    
    if (!validationResult.valid) {
      this.errors = validationResult.errors;
      return;
    }
    
    // If editing, show confirmation dialog
    if (this.editMode) {
      const confirmDialog = this.shadowRoot.querySelector('ing-confirmation-dialog');
      const confirmed = await confirmDialog.show({
        message: this.t('update_confirmation')
      });
      
      if (!confirmed) return;
      
      store.dispatch(updateEmployee(this.employee));
    } else {
      store.dispatch(addEmployee(this.employee));
    }
    
    // Navigate back to employee list
    navigateToHome();
  }

  _handleCancel() {
    navigateToHome();
  }

  render() {
    return html`
      <div class="form-container">
        <h2>${this.editMode ? this.t('edit_employee') : this.t('add_new_employee')}</h2>
        
        <form @submit=${this._handleSubmit}>
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">${this.t('first_name')}</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                .value=${this.employee.firstName}
                @input=${this._handleInputChange}
                placeholder="${this.t('enter_first_name')}"
                class="${this.errors.firstName ? 'has-error' : ''}"
              />
              ${this.errors.firstName ? html`
                <div class="error">
                  <span class="error-icon">⚠️</span>
                  ${this.t(this.errors.firstName)}
                </div>
              ` : ''}
            </div>
            
            <div class="form-group">
              <label for="lastName">${this.t('last_name')}</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                .value=${this.employee.lastName}
                @input=${this._handleInputChange}
                placeholder="${this.t('enter_last_name')}"
                class="${this.errors.lastName ? 'has-error' : ''}"
              />
              ${this.errors.lastName ? html`
                <div class="error">
                  <span class="error-icon">⚠️</span>
                  ${this.t(this.errors.lastName)}
                </div>
              ` : ''}
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="dateOfEmployment">${this.t('date_of_employment')}</label>
              <input 
                type="date" 
                id="dateOfEmployment" 
                name="dateOfEmployment" 
                .value=${this.employee.dateOfEmployment}
                @input=${this._handleInputChange}
                class="${this.errors.dateOfEmployment ? 'has-error' : ''}"
                pattern="\d{4}-\d{2}-\d{2}"
                max="${new Date().toISOString().split('T')[0]}"
              />
              ${this.errors.dateOfEmployment ? html`
                <div class="error">
                  <span class="error-icon">⚠️</span>
                  ${this.t(this.errors.dateOfEmployment)}
                </div>
              ` : ''}
            </div>
            
            <div class="form-group">
              <label for="dateOfBirth">${this.t('date_of_birth')}</label>
              <input 
                type="date" 
                id="dateOfBirth" 
                name="dateOfBirth" 
                .value=${this.employee.dateOfBirth}
                @input=${this._handleInputChange}
                class="${this.errors.dateOfBirth ? 'has-error' : ''}"
                pattern="\d{4}-\d{2}-\d{2}"
                max="${new Date().toISOString().split('T')[0]}"
              />
              ${this.errors.dateOfBirth ? html`
                <div class="error">
                  <span class="error-icon">⚠️</span>
                  ${this.t(this.errors.dateOfBirth)}
                </div>
              ` : ''}
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="phone">${this.t('phone')}</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                .value=${this.employee.phone}
                @input=${this._handleInputChange}
                placeholder="${this.t('enter_phone')}"
                class="${this.errors.phone ? 'has-error' : ''}"
              />
              ${this.errors.phone ? html`
                <div class="error">
                  <span class="error-icon">⚠️</span>
                  ${this.t(this.errors.phone)}
                </div>
              ` : ''}
            </div>
            
            <div class="form-group">
              <label for="email">${this.t('email')}</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                .value=${this.employee.email}
                @input=${this._handleInputChange}
                placeholder="${this.t('enter_email')}"
                class="${this.errors.email ? 'has-error' : ''}"
              />
              ${this.errors.email ? html`
                <div class="error">
                  <span class="error-icon">⚠️</span>
                  ${this.t(this.errors.email)}
                </div>
              ` : ''}
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="department">${this.t('department')}</label>
              <select 
                id="department" 
                name="department" 
                .value=${this.employee.department}
                @change=${this._handleInputChange}
                class="${this.errors.department ? 'has-error' : ''}"
              >
                <option value="" disabled selected>${this.t('select_department')}</option>
                <option value="analytics">${this.t('analytics')}</option>
                <option value="tech">${this.t('tech')}</option>
              </select>
              ${this.errors.department ? html`
                <div class="error">
                  <span class="error-icon">⚠️</span>
                  ${this.t(this.errors.department)}
                </div>
              ` : ''}
            </div>
            
            <div class="form-group">
              <label for="position">${this.t('position')}</label>
              <select 
                id="position" 
                name="position" 
                .value=${this.employee.position}
                @change=${this._handleInputChange}
                class="${this.errors.position ? 'has-error' : ''}"
              >
                <option value="" disabled selected>${this.t('select_position')}</option>
                <option value="junior">${this.t('junior')}</option>
                <option value="medior">${this.t('medior')}</option>
                <option value="senior">${this.t('senior')}</option>
              </select>
              ${this.errors.position ? html`
                <div class="error">
                  <span class="error-icon">⚠️</span>
                  ${this.t(this.errors.position)}
                </div>
              ` : ''}
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" class="secondary" @click=${this._handleCancel}>
              <span class="btn-icon">✖</span>
              <span>${this.t('cancel')}</span>
            </button>
            <button type="submit" class="primary">
              <span class="btn-icon">✓</span>
              <span>${this.t('save')}</span>
            </button>
          </div>
        </form>
      </div>
      
      <ing-confirmation-dialog></ing-confirmation-dialog>
    `;
  }
}

customElements.define('ing-employee-form', IngEmployeeForm); 