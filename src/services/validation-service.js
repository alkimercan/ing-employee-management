export class ValidationService {
  static validateRequired(value) {
    return value !== undefined && value !== null && value.trim() !== '';
  }
  
  static validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  
  static validatePhone(phone) {
    // Daha esnek telefon doğrulaması: en az 10 rakam içermeli, +, -, (), boşluk ve nokta içerebilir
    // Başlangıçta + işareti olabilir
    const cleaned = phone.replace(/\s+/g, ''); // Boşlukları kaldır
    
    // En az 10 rakam içermesi gereken bir telefon numarası
    const digitsCount = cleaned.replace(/\D/g, '').length;
    if (digitsCount < 10) return false;
    
    // Geçerli karakterleri kontrol et
    const validChars = /^[+0-9()\-.\s]+$/;
    return validChars.test(phone);
  }
  
  static validateEmployeeForm(employee) {
    const errors = {};
    
    if (!this.validateRequired(employee.firstName)) {
      errors.firstName = 'field_required';
    }
    
    if (!this.validateRequired(employee.lastName)) {
      errors.lastName = 'field_required';
    }
    
    if (!this.validateRequired(employee.dateOfEmployment)) {
      errors.dateOfEmployment = 'field_required';
    }
    
    if (!this.validateRequired(employee.dateOfBirth)) {
      errors.dateOfBirth = 'field_required';
    }
    
    if (!this.validateRequired(employee.phone)) {
      errors.phone = 'field_required';
    } else if (!this.validatePhone(employee.phone)) {
      errors.phone = 'invalid_phone';
    }
    
    if (!this.validateRequired(employee.email)) {
      errors.email = 'field_required';
    } else if (!this.validateEmail(employee.email)) {
      errors.email = 'invalid_email';
    }
    
    if (!this.validateRequired(employee.department)) {
      errors.department = 'field_required';
    }
    
    if (!this.validateRequired(employee.position)) {
      errors.position = 'field_required';
    }
    
    // Check if we have any errors
    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  }
} 