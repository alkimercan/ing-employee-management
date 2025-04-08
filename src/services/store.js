// @ts-ignore - Kullanımdan kaldırılmış olmasına rağmen, projenin düzgün çalışması için createStore kullanıyoruz
import { createStore } from 'redux';

// Rastgele örnek veriler oluşturmak için helper fonksiyonlar
function generateRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    .toISOString()
    .split('T')[0];
}

function generateRandomPhone() {
  const prefixes = ['+90 532', '+90 555', '+90 505', '+90 542', '+90 549'];
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomNumber = Math.floor(Math.random() * 900) + 100;
  const randomNumber2 = Math.floor(Math.random() * 90) + 10;
  const randomNumber3 = Math.floor(Math.random() * 90) + 10;
  return `${randomPrefix} ${randomNumber} ${randomNumber2} ${randomNumber3}`;
}

function generateRandomEmail(firstName, lastName) {
  const domains = ['example.com', 'company.com', 'mail.org', 'testmail.net', 'corporate.io'];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${randomDomain}`;
}

// 50 adet örnek çalışan verisi oluştur
const firstNames = [
  'John', 'Jane', 'Robert', 'Maria', 'Michael', 'Sarah', 'David', 'Jennifer', 'Thomas', 'Lisa',
  'James', 'Emma', 'William', 'Olivia', 'Charles', 'Sophia', 'Joseph', 'Emily', 'Daniel', 'Mia',
  'Matthew', 'Charlotte', 'Anthony', 'Amelia', 'Mark', 'Abigail', 'Donald', 'Ella', 'Steven', 'Grace',
  'Paul', 'Sofia', 'Andrew', 'Ava', 'Joshua', 'Scarlett', 'Kenneth', 'Madison', 'Kevin', 'Chloe',
  'Brian', 'Lily', 'George', 'Zoe', 'Edward', 'Hannah', 'Ronald', 'Layla', 'Timothy', 'Leah'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee',
  'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
  'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green',
  'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Turner'
];

const departments = ['analytics', 'tech'];
const positions = ['junior', 'medior', 'senior'];

// 50 adet çalışan verisi oluştur
const sampleEmployees = Array.from({ length: 50 }, (_, i) => {
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[i % lastNames.length];
  
  return {
    id: i + 1,
    firstName,
    lastName,
    dateOfEmployment: generateRandomDate(new Date(2018, 0, 1), new Date(2023, 0, 1)),
    dateOfBirth: generateRandomDate(new Date(1970, 0, 1), new Date(2000, 0, 1)),
    phone: generateRandomPhone(),
    email: generateRandomEmail(firstName, lastName),
    department: departments[Math.floor(Math.random() * departments.length)],
    position: positions[Math.floor(Math.random() * positions.length)]
  };
});

// Initial state with sample data
const initialState = {
  employees: sampleEmployees,
  nextId: sampleEmployees.length + 1 // Sonraki ID için son ID'den bir fazlası
};

// Action types
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';

// Action creators
export const addEmployee = (employee) => ({
  type: ADD_EMPLOYEE,
  payload: {
    ...employee,
    id: store.getState().nextId
  }
});

export const updateEmployee = (employee) => ({
  type: UPDATE_EMPLOYEE,
  payload: employee
});

export const deleteEmployee = (id) => ({
  type: DELETE_EMPLOYEE,
  payload: { id }
});

// Reducer
function employeeReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload],
        nextId: state.nextId + 1
      };
    
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map(emp => 
          emp.id === action.payload.id ? action.payload : emp
        )
      };
    
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(emp => emp.id !== action.payload.id)
      };
    
    default:
      return state;
  }
}

// Create and export the store
// Not: createStore kullanımdan kaldırılmıştır, normalde @reduxjs/toolkit'in configureStore'u önerilir
export const store = createStore(
  employeeReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Helper function to get an employee by ID
export const getEmployeeById = (id) => {
  const state = store.getState();
  return state.employees.find(emp => emp.id === parseInt(id, 10));
}; 