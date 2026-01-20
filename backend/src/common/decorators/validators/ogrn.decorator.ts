import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsOGRNConstraint implements ValidatorConstraintInterface {
  validate(ogrn: string, args: ValidationArguments) {
    const cleanedOgrn = ogrn.replace(/\s+/g, '').replace(/-/g, '');

    if (!/^\d+$/.test(cleanedOgrn)) {
      return false;
    }

    const length = cleanedOgrn.length;

    if (length !== 13 && length !== 15) {
      return false;
    }

    if (length === 13) {
      const ogrnNumber = BigInt(cleanedOgrn.substring(0, 12));
      const checksum = parseInt(cleanedOgrn[12]);
      const calculatedChecksum = Number((ogrnNumber % 11n) % 10n);

      return checksum === calculatedChecksum;
    } else {
      const ogrnipNumber = BigInt(cleanedOgrn.substring(0, 14));
      const checksum = parseInt(cleanedOgrn[14]);
      const calculatedChecksum = Number((ogrnipNumber % 13n) % 10n);

      return checksum === calculatedChecksum;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return 'Некорректный ОГРН/ОГРНИП. ОГРН должен содержать 13 цифр, ОГРНИП - 15 цифр';
  }
}

export function IsOGRN(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsOGRNConstraint,
    });
  };
}
