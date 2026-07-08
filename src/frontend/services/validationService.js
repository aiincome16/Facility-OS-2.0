/************************************************
 * Facility OS 2.0
 * validationService.js
 ************************************************/

class ValidationService {

    required(value) {

        return value !== null &&
               value !== undefined &&
               value !== "";

    }

    email(value) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    }

    minLength(value, length) {

        return String(value).length >= length;

    }

    maxLength(value, length) {

        return String(value).length <= length;

    }

}

export const validationService =
    new ValidationService();