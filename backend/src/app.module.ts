import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import KeyvRedis from '@keyv/redis';
import { PrismaModule } from './prisma/prisma.module';
import { UsersController } from './users/users.controller';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .required(),

        APP_PORT: Joi.number().required(),
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
      }),
    }),
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          stores: [
            new KeyvRedis(
              `redis://${config.getOrThrow<string>('REDIS_HOST')}:${config.getOrThrow<string>('REDIS_PORT')}`,
            ),
          ],
        };
      },
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
