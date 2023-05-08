import { Request } from 'express';

declare interface ProtectRequest extends Request {
  user: {
    id: string;
    iat: number;
    exp: number;
  };
}
