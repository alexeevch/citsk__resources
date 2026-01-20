import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

type PrismaErrorMeta = {
  target?: string[] | string;
  modelName?: string;
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter<Prisma.PrismaClientKnownRequestError> {
  constructor(private readonly config: ConfigService) {}

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const isProduction = this.config.get<string>('NODE_ENV') === 'production';

    const { statusCode, message } = this.mapPrismaError(exception);

    const errorResponse: Record<string, unknown> = {
      statusCode,
      message,
    };

    if (!isProduction) {
      errorResponse['prisma'] = {
        code: exception.code,
        meta: exception.meta,
      };
    }

    response.status(statusCode).json(errorResponse);
  }

  private mapPrismaError(exception: Prisma.PrismaClientKnownRequestError): {
    statusCode: number;
    message: string;
  } {
    const meta = exception.meta as PrismaErrorMeta | null;

    switch (exception.code) {
      case 'P2002': {
        const fields = Array.isArray(meta?.target)
          ? meta?.target.join(', ')
          : meta?.target;

        return {
          statusCode: HttpStatus.CONFLICT,
          message: fields
            ? `Запись с таким значением поля (${fields}) уже существует`
            : 'Запись с такими данными уже существует',
        };
      }

      case 'P2025':
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Запись не найдена',
        };

      case 'P2003':
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Нарушение связей между сущностями',
        };

      default:
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ошибка базы данных',
        };
    }
  }
}
