import { ConfigService } from '@nestjs/config';

export function getIpWhitelist(config: ConfigService): string[] {
  const raw = config.getOrThrow<string>('IP_WHITELIST', '');
  return raw
    .split(',')
    .map((ip) => ip.trim())
    .filter(Boolean);
}
