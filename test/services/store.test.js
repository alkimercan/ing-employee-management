import { expect } from '@open-wc/testing';
import { store, addEmployee, updateEmployee, deleteEmployee, getEmployeeById } from '../../src/services/store.js';

describe('Redux Store', () => {
  describe('Action Creators', () => {
    it('creates an ADD_EMPLOYEE action with the correct payload', () => {
      // getState ile store'un güncel durumunu alıyoruz
      const nextId = store.getState().nextId;
      
      const employee = {
        firstName: 'Test',
        lastName: 'User',
        dateOfEmployment: '2023-01-01',
        dateOfBirth: '1990-01-01',
        phone: '1234567890',
        email: 'test@example.com',
        department: 'tech',
        position: 'junior'
      };
      
      const action = addEmployee(employee);
      
      expect(action.type).to.equal('ADD_EMPLOYEE');
      expect(action.payload).to.include({
        firstName: 'Test',
        lastName: 'User',
        id: nextId
      });
    });
    
    it('creates an UPDATE_EMPLOYEE action with the correct payload', () => {
      const employee = {
        id: 1,
        firstName: 'Updated',
        lastName: 'User',
        dateOfEmployment: '2023-01-01',
        dateOfBirth: '1990-01-01',
        phone: '1234567890',
        email: 'updated@example.com',
        department: 'tech',
        position: 'senior'
      };
      
      const action = updateEmployee(employee);
      
      expect(action.type).to.equal('UPDATE_EMPLOYEE');
      expect(action.payload).to.deep.equal(employee);
    });
    
    it('creates a DELETE_EMPLOYEE action with the correct payload', () => {
      const action = deleteEmployee(5);
      
      expect(action.type).to.equal('DELETE_EMPLOYEE');
      expect(action.payload).to.deep.equal({ id: 5 });
    });
  });
  
  describe('Reducers', () => {
    it('adds a new employee to the store', () => {
      const initialEmployeesCount = store.getState().employees.length;
      const initialNextId = store.getState().nextId;
      
      const employee = {
        firstName: 'New',
        lastName: 'Employee',
        dateOfEmployment: '2023-01-01',
        dateOfBirth: '1990-01-01',
        phone: '1234567890',
        email: 'new@example.com',
        department: 'tech',
        position: 'senior'
      };
      
      store.dispatch(addEmployee(employee));
      
      const newState = store.getState();
      expect(newState.employees.length).to.equal(initialEmployeesCount + 1);
      expect(newState.nextId).to.equal(initialNextId + 1);
      
      const addedEmployee = newState.employees.find(emp => emp.email === 'new@example.com');
      expect(addedEmployee).to.exist;
      expect(addedEmployee.firstName).to.equal('New');
      expect(addedEmployee.lastName).to.equal('Employee');
    });
    
    it('updates an employee in the store', () => {
      // Önce bir çalışan ekleyelim
      const employee = {
        firstName: 'Test',
        lastName: 'Update',
        dateOfEmployment: '2023-01-01',
        dateOfBirth: '1990-01-01',
        phone: '1234567890',
        email: 'test.update@example.com',
        department: 'tech',
        position: 'senior'
      };
      
      store.dispatch(addEmployee(employee));
      
      // Eklenen çalışanın ID'sini alalım
      const addedEmployee = store.getState().employees.find(emp => emp.email === 'test.update@example.com');
      const employeeId = addedEmployee.id;
      
      // Şimdi çalışanı güncelleyelim
      const updatedEmployee = {
        ...addedEmployee,
        firstName: 'Updated',
        lastName: 'Name'
      };
      
      store.dispatch(updateEmployee(updatedEmployee));
      
      // Güncellendiğini kontrol edelim
      const stateAfterUpdate = store.getState();
      const employeeAfterUpdate = stateAfterUpdate.employees.find(emp => emp.id === employeeId);
      
      expect(employeeAfterUpdate.firstName).to.equal('Updated');
      expect(employeeAfterUpdate.lastName).to.equal('Name');
      expect(employeeAfterUpdate.email).to.equal('test.update@example.com'); // Değişmemiş olmalı
    });
    
    it('deletes an employee from the store', () => {
      // Önce bir çalışan ekleyelim
      const employee = {
        firstName: 'To',
        lastName: 'Delete',
        dateOfEmployment: '2023-01-01',
        dateOfBirth: '1990-01-01',
        phone: '1234567890',
        email: 'to.delete@example.com',
        department: 'tech',
        position: 'senior'
      };
      
      store.dispatch(addEmployee(employee));
      
      // Eklenen çalışanın ID'sini alalım
      const addedEmployee = store.getState().employees.find(emp => emp.email === 'to.delete@example.com');
      const employeeId = addedEmployee.id;
      
      const employeeCountBefore = store.getState().employees.length;
      
      // Şimdi çalışanı silelim
      store.dispatch(deleteEmployee(employeeId));
      
      const stateAfterDelete = store.getState();
      expect(stateAfterDelete.employees.length).to.equal(employeeCountBefore - 1);
      expect(stateAfterDelete.employees.find(emp => emp.id === employeeId)).to.be.undefined;
    });
  });
  
  describe('Helper Functions', () => {
    it('getEmployeeById returns the correct employee', () => {
      // Önce çalışan ekleyelim
      const employee = {
        firstName: 'For',
        lastName: 'GetById',
        dateOfEmployment: '2023-01-01',
        dateOfBirth: '1990-01-01',
        phone: '1234567890',
        email: 'for.getbyid@example.com',
        department: 'tech',
        position: 'senior'
      };
      
      store.dispatch(addEmployee(employee));
      
      // Eklenen çalışanın ID'sini alalım
      const addedEmployee = store.getState().employees.find(emp => emp.email === 'for.getbyid@example.com');
      const employeeId = addedEmployee.id;
      
      // getEmployeeById ile çalışanı alalım
      const foundEmployee = getEmployeeById(employeeId);
      
      expect(foundEmployee).to.exist;
      expect(foundEmployee.id).to.equal(employeeId);
      expect(foundEmployee.firstName).to.equal('For');
      expect(foundEmployee.lastName).to.equal('GetById');
    });
    
    it('getEmployeeById returns undefined for non-existent ID', () => {
      const nonExistentId = 99999;
      const result = getEmployeeById(nonExistentId);
      expect(result).to.be.undefined;
    });
  });
}); 