import {
    ValidationOptions,
    buildMessage,
    registerDecorator,
    ValidationArguments,
  } from 'class-validator';
  
  export function IsPhoneNumber(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isPhoneNumber',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [],
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            if (typeof value !== 'string') {
              return false;
            }
            // Phone number format: +251XXXXXXXXX
            const phoneNumberRegex = /^\+251\d{9}$/;
            return phoneNumberRegex.test(value);
          },
          defaultMessage: buildMessage(
            (eachPrefix) =>
              eachPrefix +
              '$property must be a valid phone number with the country code (e.g., +251XXXXXXXXX)',
            validationOptions
          ),
        },
      });
    };
  }
  