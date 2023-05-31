
export interface JWTClaims {
  userId: string;
  tenantId: string;
  email: string;
  username: string;
  isAdminUser: boolean;
  isSuperAdmin: boolean;
}; 

export type JWTToken = string;

export type SessionId = string;

export type RefreshToken = string;