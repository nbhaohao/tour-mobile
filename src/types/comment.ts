import { User } from '@/types/user';

export interface Comment {
  id: number;
  createTime: number;
  user: User;
  msg: string;
}

export type Comments = Array<Comment>;
