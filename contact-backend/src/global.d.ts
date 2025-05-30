import 'express';

declare module 'express' {
  interface Request {
    user?: { username: string }; // match your actual user payload shape
  }
}
