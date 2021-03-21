export interface Comment {
  id: number;
  avatar: string;
  username: string;
  createTime: number;
  info: string;
}

export type Comments = Array<Comment>;
