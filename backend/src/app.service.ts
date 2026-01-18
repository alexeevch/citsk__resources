import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async getHello(): Promise<string | undefined> {
    const value = 'Hello Wor2ld!';
    const key = 'test';
    await this.cacheManager.set(key, value);

    return this.cacheManager.get(key);
  }
}
