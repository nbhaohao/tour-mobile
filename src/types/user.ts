export interface User {
  id: number;
  username: string;
}

export interface LoginResponse extends User {
  token: string;
}
