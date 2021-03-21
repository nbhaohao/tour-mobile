export enum OrderType {
  NEED_PAY,
  PAY_COMPLETE = 1,
}

export interface Order {
  id: number;
  img: string;
  title: string;
  info: string;
  price: string;
  createTime: string;
}

export type Orders = Array<Order>;