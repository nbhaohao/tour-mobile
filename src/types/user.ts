export interface User {
  id: number;
  username: string;
  avatar?: string;
}

export interface LoginResponse extends User {
  token: string;
}
