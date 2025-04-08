import { Router } from '@vaadin/router';

// This file exists to provide a central place for router configuration
// The actual router initialization happens in the app.js file

// Router utility functions that can be used across the application
export const navigateTo = (path) => {
  Router.go(path);
};

export const navigateToEdit = (id) => {
  Router.go(`/edit/${id}`);
};

export const navigateToHome = () => {
  Router.go('/');
}; 