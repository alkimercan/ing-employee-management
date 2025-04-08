# ING Employee Management System

A web application built with LitElement JavaScript to help HR staff manage company employee information.

## Features

- List all employee records with pagination and search
- Table and list view options for displaying employees
- Add new employee records
- Edit existing employee records
- Delete employee records
- Multi-language support (English and Turkish)
- Responsive design for mobile and desktop
- Form validation

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ing-employee-management.git
cd ing-employee-management
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

To start the development server:

```bash
npm run serve
```

This will launch the application at http://localhost:8000.

## Building for Production

To build the application for production:

```bash
npm run build
```

## Running Tests

To run the tests:

```bash
npm test
```

## Project Structure

- `/src` - Source code of the application
  - `/components` - Web components
  - `/services` - Services like store (Redux)
  - `/i18n` - Internationalization
  - `/routes` - Router configuration
  - `/styles` - Shared styles
- `/test` - Test files

## Technologies Used

- LitElement - For creating web components
- Redux - For state management
- Vaadin Router - For client-side routing
- Web Component Testing - For unit testing

## License

This project is licensed under the MIT License - see the LICENSE file for details.
