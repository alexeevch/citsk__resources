export type Role = 'ADMIN' | 'ROOT';

export interface JWTPayload {
  id: string;
  role: string;
}
