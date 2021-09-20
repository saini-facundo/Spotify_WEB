import { Token } from './token.inteface';
import { User } from './user.interface';
export interface Session {
  screen: string,
  user: User,
  userCode: string,
  token: Token;
}