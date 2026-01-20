import ipRangeCheck from 'ip-range-check';

export function isIpInWhitelist(
  clientIp: string,
  whitelist: string[],
): boolean {
  if (!clientIp) return false;
  return ipRangeCheck(clientIp, whitelist);
}
