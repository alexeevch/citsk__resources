import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsEngCode(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsEngCode',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (typeof value !== 'string') return false;
          return /^[A-Za-z_]+$/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `Поле "${args.property}" может содержать только английские буквы и символ "_"`;
        },
      },
    });
  };
}
