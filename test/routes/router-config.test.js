import { expect } from '@open-wc/testing';
import { navigateTo, navigateToEdit, navigateToHome } from '../../src/routes/router-config.js';
import { Router } from '@vaadin/router';

describe('Router Configuration', () => {
  // Router.go'yu geçici olarak taklit edelim
  let originalRouterGo;
  
  beforeEach(() => {
    // Orijinal Router.go metodunu sakla
    originalRouterGo = Router.go;
    
    // Router.go'yu bir mock fonksiyon ile değiştir
    Router.go = function(path) {
      // Son çağrıldığında kullanılan path'i kaydet
      Router.lastCalledPath = path;
    };
  });
  
  afterEach(() => {
    // Test bittikten sonra orijinal Router.go metodunu geri yükle
    Router.go = originalRouterGo;
    Router.lastCalledPath = undefined;
  });
  
  it('navigateTo redirects to the specified path', () => {
    navigateTo('/test-path');
    expect(Router.lastCalledPath).to.equal('/test-path');
  });
  
  it('navigateToEdit redirects to the edit path with ID', () => {
    navigateToEdit(42);
    expect(Router.lastCalledPath).to.equal('/edit/42');
  });
  
  it('navigateToHome redirects to the root path', () => {
    navigateToHome();
    expect(Router.lastCalledPath).to.equal('/');
  });
}); 