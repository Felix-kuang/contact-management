import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    username: string;
    // add more fields if needed (e.g. roles, id, etc.)
  };
}
