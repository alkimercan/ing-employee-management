import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import './components/ing-header.js';
import './components/ing-nav.js';
import './routes/router-config.js';
import './services/store.js';

/**
 * Main application component
 */
export class IngApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background-color: var(--light-gray, #f8f9fa);
    }
    
    .content {
      padding: 30px 20px;
    }
    
    main {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    @media (max-width: 768px) {
      .content {
        padding: 20px 15px;
      }
    }
  `;

  firstUpdated() {
    const router = new Router(this.renderRoot.querySelector('#outlet'));
    router.setRoutes([
      { path: '/', component: 'ing-employee-list' },
      { path: '/add', component: 'ing-employee-form' },
      { path: '/edit/:id', component: 'ing-employee-form' },
      { path: '(.*)', redirect: '/' }
    ]);
  }

  render() {
    return html`
      <ing-header></ing-header>
      <ing-nav></ing-nav>
      <main>
        <div class="content">
          <div id="outlet"></div>
        </div>
      </main>
    `;
  }
}

customElements.define('ing-app', IngApp);

// Import all components that might be lazy-loaded
import('./components/ing-employee-list.js');
import('./components/ing-employee-form.js'); 