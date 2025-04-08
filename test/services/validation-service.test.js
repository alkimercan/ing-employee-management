import { expect } from '@open-wc/testing';
import { ValidationService } from '../../src/services/validation-service.js';

describe('ValidationService', () => {
  describe('validateRequired', () => {
    it('returns false for undefined values', () => {
      expect(ValidationService.validateRequired(undefined)).to.be.false;
    });

    it('returns false for null values', () => {
      expect(ValidationService.validateRequired(null)).to.be.false;
    });

    it('returns false for empty strings', () => {
      expect(ValidationService.validateRequired('')).to.be.false;
    });

    it('returns false for strings with only whitespace', () => {
      expect(ValidationService.validateRequired('   ')).to.be.false;
    });

    it('returns true for non-empty strings', () => {
      expect(ValidationService.validateRequired('test')).to.be.true;
    });
  });

  describe('validateEmail', () => {
    it('returns false for invalid email format', () => {
      expect(ValidationService.validateEmail('invalidemail')).to.be.false;
      expect(ValidationService.validateEmail('invalid@')).to.be.false;
      expect(ValidationService.validateEmail('@domain.com')).to.be.false;
      expect(ValidationService.validateEmail('invaliddomain.com')).to.be.false;
    });

    it('returns true for valid email format', () => {
      expect(ValidationService.validateEmail('test@example.com')).to.be.true;
      expect(ValidationService.validateEmail('test.name@domain.com')).to.be.true;
      expect(ValidationService.validateEmail('test+tag@example.co.uk')).to.be.true;
    });
  });

  describe('validatePhone', () => {
    it('returns false for phone numbers with less than 10 digits', () => {
      expect(ValidationService.validatePhone('123456789')).to.be.false;
    });

    it('returns false for phone numbers with invalid characters', () => {
      expect(ValidationService.validatePhone('123*456*789*0')).to.be.false;
      expect(ValidationService.validatePhone('test12345678901')).to.be.false;
    });

    it('returns true for phone numbers with valid format', () => {
      expect(ValidationService.validatePhone('1234567890')).to.be.true;
      expect(ValidationService.validatePhone('+90 532 123 45 67')).to.be.true;
      expect(ValidationService.validatePhone('(555) 123-4567')).to.be.true;
      expect(ValidationService.validatePhone('555.123.4567')).to.be.true;
    });
  });

  describe('validateEmployeeForm', () => {
    it('returns valid=false when required fields are missing', () => {
      const employee = {
        firstName: '',
        lastName: 'Doe',
        dateOfEmployment: '2023-01-01',
        dateOfBirth: '1990-01-01',
        phone: '1234567890',
        email: 'john.doe@example.com',
        department: 'tech',
        position: 'senior'
      };

      const result = ValidationService.validateEmployeeForm(employee);
      expect(result.valid).to.be.false;
      expect(result.errors).to.have.property('firstName').equal('field_required');
    });

    it('returns valid=false when email is invalid', () => {
      const employee = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2023-01-01',
        dateOfBirth: '1990-01-01',
        phone: '1234567890',
        email: 'invalid-email',
        department: 'tech',
        position: 'senior'
      };

      const result = ValidationService.validateEmployeeForm(employee);
      expect(result.valid).to.be.false;
      expect(result.errors).to.have.property('email').equal('invalid_email');
    });

    it('returns valid=false when phone is invalid', () => {
      const employee = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2023-01-01',
        dateOfBirth: '1990-01-01',
        phone: '123', // Too short
        email: 'john.doe@example.com',
        department: 'tech',
        position: 'senior'
      };

      const result = ValidationService.validateEmployeeForm(employee);
      expect(result.valid).to.be.false;
      expect(result.errors).to.have.property('phone').equal('invalid_phone');
    });

    it('returns valid=true when all validations pass', () => {
      const employee = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2023-01-01',
        dateOfBirth: '1990-01-01',
        phone: '1234567890',
        email: 'john.doe@example.com',
        department: 'tech',
        position: 'senior'
      };

      const result = ValidationService.validateEmployeeForm(employee);
      expect(result.valid).to.be.true;
      expect(result.errors).to.be.an('object').that.is.empty;
    });
  });
}); 