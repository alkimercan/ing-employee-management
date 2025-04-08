import { LitElement, html, css } from 'lit';
import { I18nMixin } from '../i18n/i18n-service.js';
import { store, deleteEmployee } from '../services/store.js';
import { navigateToEdit } from '../routes/router-config.js';
import './ing-confirmation-dialog.js';

export class IngEmployeeList extends I18nMixin(LitElement) {
  static styles = css`
    :host {
      display: block;
    }
    
    .controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      flex-wrap: wrap;
      gap: 15px;
      background-color: white;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    
    .view-controls {
      display: flex;
      gap: 10px;
    }
    
    .search-controls {
      display: flex;
      gap: 10px;
      flex: 1;
      max-width: 400px;
    }
    
    .btn {
      background-color: #f0f0f0;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 8px 12px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    
    .btn:hover {
      background-color: #e0e0e0;
    }
    
    .btn.active {
      background-color: #cc4e00;
      color: white;
      border-color: #cc4e00;
    }
    
    .btn-icon {
      font-size: 14px;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      position: relative;
    }
    
    .edit-btn .btn-icon {
      font-size: 16px;
    }
    
    .delete-btn .btn-icon {
      font-size: 16px;
    }
    
    .search-input {
      padding: 10px 16px;
      border: 1px solid #ddd;
      border-radius: 25px;
      width: 100%;
      font-size: 14px;
      background-color: #f9f9f9;
      transition: all 0.3s;
    }
    
    .search-input:focus {
      outline: none;
      border-color: #cc4e00;
      background-color: white;
      box-shadow: 0 0 0 3px rgba(204, 78, 0, 0.1);
    }
    
    .employee-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      margin-bottom: 20px;
    }
    
    table {
        display: block;
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      table-layout: fixed;
    }
    
    th, td {
      padding: 16px;
      text-align: left;
      border-bottom: 1px solid #eee;
      vertical-align: middle;
      color: #333;
      font-size: 14px;
    }
    
    th {
      background-color: #fff;
      font-weight: 600;
      color: #B34700;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid #B34700;
      padding-top: 14px;
      padding-bottom: 14px;
    }
    
    tr:hover {
      background-color: #f9f9f9;
    }
    
    tr:last-child td {
      border-bottom: none;
    }
    
    .checkbox-header {
      width: 40px;
      text-align: center;
    }
    
    td:first-child {
      text-align: center;
    }
    
    .actions-col {
      width: 120px;
      text-align: center;
    }
    
    td.actions {
      padding: 8px 16px;
      white-space: nowrap;
      vertical-align: middle;
      text-align: center;
    }
    
    td.actions .actions {
      margin: -4px 0;
      justify-content: center;
    }
    
    .card-view {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      padding: 16px;
    }
    
    .employee-card {
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 20px;
      background-color: white;
      transition: all 0.3s;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    }
    
    .employee-card:hover {
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
    
    .employee-card h3 {
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 18px;
      color: #B34700;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    
    .employee-card .details {
      margin-bottom: 20px;
    }
    
    .employee-card .detail-item {
      margin-bottom: 12px;
      display: flex;
      align-items: center;
    }
    
    .employee-card .detail-label {
      font-weight: bold;
      color: #555;
      width: 40%;
      font-size: 13px;
    }
    
    .actions {
      gap: 8px;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
    }
    
    .edit-btn, .delete-btn {
      border: none;
      border-radius: 4px;
      padding: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      min-width: 32px;
      width: 32px;
      font-size: 13px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12);
      margin: 0 2px;
      height: 32px;
      box-sizing: border-box;
    }
    
    .edit-btn {
      background-color: #2196F3;
      color: white;
    }
    
    .edit-btn:hover {
      background-color: #0d8bf2;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    
    .delete-btn {
      background-color: #F44336;
      color: white;
    }
    
    .delete-btn:hover {
      background-color: #e53935;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      gap: 5px;
      flex-wrap: wrap;
      padding: 10px 0;
    }
    
    .page-btn {
      min-width: 40px;
      height: 40px;
      padding: 0 10px;
      border: 1px solid #ddd;
      background-color: white;
      cursor: pointer;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      transition: all 0.2s;
    }
    
    .page-btn:hover:not(:disabled) {
      border-color: #ff6200;
      color: #ff6200;
    }
    
    .page-btn.active {
      background-color: #cc4e00;
      color: white;
      border-color: #cc4e00;
    }
    
    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .pagination-info {
      margin: 0 10px;
      font-size: 14px;
      color: #666;
      white-space: nowrap;
      background-color: #f9f9f9;
      padding: 6px 12px;
      border-radius: 4px;
      border: 1px solid #eee;
      display: inline-block;
    }
    
    .pagination-select {
      margin-left: 10px;
      padding: 5px 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: white;
    }
    
    .no-employees {
      text-align: center;
      padding: 40px 20px;
      font-size: 16px;
      color: #666;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    
    .emp-checkbox {
      width: 18px;
      height: 18px;
      cursor: pointer;
      border-radius: 3px;
      border: 1px solid #ddd;
      appearance: none;
      -webkit-appearance: none;
      position: relative;
      background-color: white;
      transition: all 0.2s;
    }
    
    .emp-checkbox:checked {
      background-color: #cc4e00;
      border-color: #cc4e00;
    }
    
    .emp-checkbox:checked::after {
      content: "✓";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 12px;
      line-height: 1;
    }
    
    .pagination-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      flex-wrap: wrap;
      gap: 15px;
    }
    
    .pagination-pages {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px;
    }
    
    .page-size-control {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      color: #666;
      white-space: nowrap;
    }
    
    .ellipsis {
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #666;
    }
    
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
    
    @media (max-width: 768px) {
      table {
        display: block;
        overflow-x: auto;
      }
      
      th, td {
        padding: 12px 10px;
        font-size: 13px;
      }
      
      .controls {
        flex-direction: column;
        align-items: stretch;
      }
      
      .search-controls {
        max-width: none;
      }
      
      .employee-card {
        margin-bottom: 15px;
      }
      
      .page-btn {
        min-width: 35px;
        height: 35px;
      }
      
      .pagination-controls {
        flex-direction: column;
        gap: 15px;
        align-items: center;
      }
      
      .pagination-pages {
        justify-content: center;
      }
      
      .pagination-info {
        text-align: center;
        width: 100%;
        margin: 10px 0;
      }
      
      .page-size-control {
        margin-top: 5px;
      }
      
      .actions {
        justify-content: center;
      }
      
      .actions-col {
        width: 100px;
      }
      
      .edit-btn, .delete-btn {
        padding: 4px 8px;
        font-size: 12px;
        min-width: 32px;
        height: 28px;
      }
    }
  `;

  static properties = {
    employees: { type: Array },
    filteredEmployees: { type: Array },
    viewMode: { type: String },
    searchTerm: { type: String },
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
    selectedEmployees: { type: Array }
  };

  constructor() {
    super();
    this.employees = [];
    this.filteredEmployees = [];
    this.viewMode = 'table';
    this.searchTerm = '';
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.selectedEmployees = [];
    
    // Bind store update listener
    this._boundStoreListener = this._handleStoreUpdate.bind(this);
    this._unsubscribeStore = null; // Store'dan ayrılma işlevi için referans
  }

  connectedCallback() {
    super.connectedCallback();
    // Yeni subscribtion metodunu kullan ve döndürülen fonksiyonu sakla
    this._unsubscribeStore = store.subscribe(this._boundStoreListener);
    this._handleStoreUpdate();
  }

  disconnectedCallback() {
    // Eğer _unsubscribeStore bir fonksiyon ise onu çağır
    if (typeof this._unsubscribeStore === 'function') {
      this._unsubscribeStore();
    }
    super.disconnectedCallback();
  }

  _handleStoreUpdate() {
    this.employees = store.getState().employees;
    this._filterEmployees();
  }
  
  _filterEmployees() {
    if (!this.searchTerm) {
      this.filteredEmployees = [...this.employees];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredEmployees = this.employees.filter(emp => 
        emp.firstName.toLowerCase().includes(searchTermLower) ||
        emp.lastName.toLowerCase().includes(searchTermLower) ||
        emp.email.toLowerCase().includes(searchTermLower) ||
        emp.department.toLowerCase().includes(searchTermLower) ||
        emp.position.toLowerCase().includes(searchTermLower)
      );
    }
    
    // Reset to first page when filtering changes
    this.currentPage = 1;
  }

  async _handleDelete(id) {
    const confirmDialog = this.shadowRoot.querySelector('ing-confirmation-dialog');
    const confirmed = await confirmDialog.show({
      message: this.t('delete_confirmation')
    });
    
    if (confirmed) {
      store.dispatch(deleteEmployee(id));
    }
  }

  _handleEdit(employee) {
    navigateToEdit(employee);
  }

  _handleSearchInput(e) {
    this.searchTerm = e.target.value;
    this._filterEmployees();
  }

  _handleViewModeChange(mode) {
    this.viewMode = mode;
  }

  _handlePageChange(page) {
    this.currentPage = page;
  }
  
  _handleItemsPerPageChange(e) {
    this.itemsPerPage = parseInt(e.target.value, 10);
    this.currentPage = 1; // Sayfa değiştiğinde ilk sayfaya dön
  }
  
  _getPaginatedEmployees() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredEmployees.slice(startIndex, endIndex);
  }
  
  _getTotalPages() {
    return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
  }
  
  _renderPageButtons(totalPages) {
    const maxVisiblePages = 5; // Maksimum görüntülenecek sayfa numarası
    
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Eğer sonda boşluk varsa başa doğru genişlet
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    const pages = [];
    
    // İlk sayfa bağlantısı
    if (startPage > 1) {
      pages.push(html`
        <button class="page-btn" @click=${() => this._changePage(1)}>1</button>
      `);
      
      if (startPage > 2) {
        pages.push(html`<div class="ellipsis">...</div>`);
      }
    }
    
    // Sayfa numaralarını oluştur
    for (let i = startPage; i <= endPage; i++) {
      pages.push(html`
        <button 
          class="page-btn ${i === this.currentPage ? 'active' : ''}"
          @click=${() => this._changePage(i)}
          aria-label="${this.t('go_to_page')} ${i}"
          aria-current="${i === this.currentPage ? 'page' : 'false'}"
        >${i}</button>
      `);
    }
    
    // Son sayfa bağlantısı
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(html`<div class="ellipsis">...</div>`);
      }
      
      pages.push(html`
        <button 
          class="page-btn" 
          @click=${() => this._changePage(totalPages)}
          aria-label="${this.t('go_to_page')} ${totalPages}"
        >${totalPages}</button>
      `);
    }
    
    return pages;
  }
  
  _changePage(pageNumber) {
    this.currentPage = pageNumber;
  }
  
  _renderTableView() {
    const paginatedEmployees = this._getPaginatedEmployees();
    
    if (paginatedEmployees.length === 0) {
      return html`<div class="no-employees">${this.t('no_employees_found')}</div>`;
    }
    
    return html`
      <div class="employee-container">
        <table>
          <thead>
            <tr>
              <th class="checkbox-header">
                <input 
                  type="checkbox" 
                  class="emp-checkbox" 
                  @change=${this._handleSelectAll}
                  aria-label="${this.t('select_all_employees')}"
                >
              </th>
              <th>${this.t('first_name')}</th>
              <th>${this.t('last_name')}</th>
              <th>${this.t('date_of_employment')}</th>
              <th>${this.t('date_of_birth')}</th>
              <th>${this.t('phone')}</th>
              <th>${this.t('email')}</th>
              <th>${this.t('department')}</th>
              <th>${this.t('position')}</th>
              <th class="actions-col">${this.t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            ${paginatedEmployees.map(employee => html`
              <tr>
                <td>
                  <input 
                    type="checkbox" 
                    class="emp-checkbox" 
                    @change=${(e) => this._handleEmployeeSelect(e, employee.id)}
                    ?checked=${this.selectedEmployees.includes(employee.id)}
                    aria-label="${this.t('select_employee')} ${employee.firstName} ${employee.lastName}"
                  >
                </td>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.dateOfEmployment}</td>
                <td>${employee.dateOfBirth}</td>
                <td>${employee.phone}</td>
                <td>${employee.email}</td>
                <td>${this.t(employee.department)}</td>
                <td>${this.t(employee.position)}</td>
                <td class="actions">
                  <div class="actions">
                    <button class="edit-btn" @click=${() => this._handleEdit(employee.id)} aria-label="${this.t('edit')} ${employee.firstName} ${employee.lastName}">
                      <span class="btn-icon">✏️</span>
                    </button>
                    <button class="delete-btn" @click=${() => this._handleDelete(employee.id)} aria-label="${this.t('delete')} ${employee.firstName} ${employee.lastName}">
                      <span class="btn-icon">🗑️</span>
                    </button>
                  </div>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
      ${this._renderPagination()}
    `;
  }
  
  _renderCardView() {
    const paginatedEmployees = this._getPaginatedEmployees();
    
    if (paginatedEmployees.length === 0) {
      return html`<div class="no-employees">${this.t('no_employees_found')}</div>`;
    }
    
    return html`
      <div class="card-view">
        ${paginatedEmployees.map(employee => html`
          <div class="employee-card">
            <h3>${employee.firstName} ${employee.lastName}</h3>
            <div class="details">
              <div class="detail-item">
                <span class="detail-label">${this.t('department')}:</span> 
                ${this.t(employee.department)}
              </div>
              <div class="detail-item">
                <span class="detail-label">${this.t('position')}:</span> 
                ${this.t(employee.position)}
              </div>
              <div class="detail-item">
                <span class="detail-label">${this.t('email')}:</span> 
                ${employee.email}
              </div>
              <div class="detail-item">
                <span class="detail-label">${this.t('phone')}:</span> 
                ${employee.phone}
              </div>
              <div class="detail-item">
                <span class="detail-label">${this.t('date_of_employment')}:</span> 
                ${employee.dateOfEmployment}
              </div>
            </div>
            <div class="actions" style="justify-content: center; margin-top: 15px;">
              <button class="edit-btn" @click=${() => this._handleEdit(employee.id)} aria-label="${this.t('edit')} ${employee.firstName} ${employee.lastName}">
                <span class="btn-icon">✏️</span>
              </button>
              <button class="delete-btn" @click=${() => this._handleDelete(employee.id)} aria-label="${this.t('delete')} ${employee.firstName} ${employee.lastName}">
                <span class="btn-icon">🗑️</span>
              </button>
            </div>
          </div>
        `)}
      </div>
      ${this._renderPagination()}
    `;
  }
  
  _handleSelectAll(e) {
    const isChecked = e.target.checked;
    const paginatedEmployees = this._getPaginatedEmployees();
    
    if (isChecked) {
      this.selectedEmployees = paginatedEmployees.map(emp => emp.id);
    } else {
      this.selectedEmployees = [];
    }
  }
  
  _handleEmployeeSelect(e, empId) {
    const isChecked = e.target.checked;
    
    if (isChecked) {
      this.selectedEmployees = [...this.selectedEmployees, empId];
    } else {
      this.selectedEmployees = this.selectedEmployees.filter(id => id !== empId);
    }
  }

  _renderPagination() {
    const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
    if (totalPages <= 1) return html``;
    
    return html`
      <div class="pagination">
        <div class="pagination-controls">
          <div class="pagination-pages">
            <button 
              class="page-btn" 
              @click=${() => this._changePage(1)}
              ?disabled=${this.currentPage === 1}
              aria-label="${this.t('first_page')}"
            >
              &laquo;
            </button>
            <button 
              class="page-btn" 
              @click=${() => this._changePage(this.currentPage - 1)}
              ?disabled=${this.currentPage === 1}
              aria-label="${this.t('previous_page')}"
            >
              &lsaquo;
            </button>
            
            ${this._renderPageButtons(totalPages)}
            
            <button 
              class="page-btn" 
              @click=${() => this._changePage(this.currentPage + 1)}
              ?disabled=${this.currentPage === totalPages}
              aria-label="${this.t('next_page')}"
            >
              &rsaquo;
            </button>
            <button 
              class="page-btn" 
              @click=${() => this._changePage(totalPages)}
              ?disabled=${this.currentPage === totalPages}
              aria-label="${this.t('last_page')}"
            >
              &raquo;
            </button>
          </div>
          
          <div class="page-size-control">
            <span>${this.t('items_per_page')}</span>
            <select 
              class="pagination-select" 
              @change=${this._handleItemsPerPageChange}
              aria-label="${this.t('select_items_per_page')}"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="employee-list-container">
        <div class="controls">
          <div class="view-controls">
            <button 
              class="btn ${this.viewMode === 'table' ? 'active' : ''}"
              @click=${() => this._handleViewModeChange('table')}
              aria-label="${this.t('table_view')}"
              aria-pressed="${this.viewMode === 'table'}"
            >
              <span class="btn-icon">📋</span> ${this.t('table_view')}
            </button>
            <button 
              class="btn ${this.viewMode === 'card' ? 'active' : ''}"
              @click=${() => this._handleViewModeChange('card')}
              aria-label="${this.t('list_view')}"
              aria-pressed="${this.viewMode === 'card'}"
            >
              <span class="btn-icon">🗂️</span> ${this.t('list_view')}
            </button>
          </div>
          
          <div class="search-controls">
            <input 
              type="text" 
              class="search-input" 
              placeholder="${this.t('search')}..." 
              .value=${this.searchTerm}
              @input=${this._handleSearchInput}
              aria-label="${this.t('search_employees')}"
            >
          </div>
        </div>
        
        ${this.viewMode === 'table' ? this._renderTableView() : this._renderCardView()}
      </div>
      
      <ing-confirmation-dialog></ing-confirmation-dialog>
    `;
  }
}

customElements.define('ing-employee-list', IngEmployeeList); 