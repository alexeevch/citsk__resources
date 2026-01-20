import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsINNConstraint implements ValidatorConstraintInterface {
  validate(inn: string, args: ValidationArguments) {
    if (typeof inn !== 'string') {
      return false;
    }

    const cleanedInn = inn.replace(/\s+/g, '').replace(/-/g, '');

    if (!/^\d+$/.test(cleanedInn)) {
      return false;
    }

    const length = cleanedInn.length;
    if (length !== 10 && length !== 12) {
      return false;
    }

    if (length === 10) {
      return this.validateJuridicalInn(cleanedInn);
    } else {
      return this.validatePhysicalInn(cleanedInn);
    }
  }

  private validateJuridicalInn(inn: string): boolean {
    const coefficients = [2, 4, 10, 3, 5, 9, 4, 6, 8];
    const checksum = this.calculateChecksum(
      inn.substring(0, 9),
      coefficients,
      11,
    );

    return parseInt(inn[9]) === checksum;
  }

  private validatePhysicalInn(inn: string): boolean {
    const coefficients11 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
    const checksum11 = this.calculateChecksum(
      inn.substring(0, 10),
      coefficients11,
      11,
    );

    const coefficients12 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
    const checksum12 = this.calculateChecksum(
      inn.substring(0, 11),
      coefficients12,
      11,
    );

    return parseInt(inn[10]) === checksum11 && parseInt(inn[11]) === checksum12;
  }

  private calculateChecksum(
    numbers: string,
    coefficients: number[],
    mod: number,
  ): number {
    let sum = 0;
    for (let i = 0; i < coefficients.length; i++) {
      sum += parseInt(numbers[i]) * coefficients[i];
    }

    const result = sum % mod;
    return result === 10 ? 0 : result;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Некорректный ИНН. ИНН должен содержать 10 цифр (для юрлиц) или 12 цифр (для физлиц и ИП)';
  }
}

export function IsINN(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsINNConstraint,
    });
  };
}
