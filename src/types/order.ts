import { House } from '@/types/house';

export enum OrderType {
  NEED_PAY,
  PAY_COMPLETE = 1,
}

export interface Order {
  id: number;
  house: House;
  create_time: string;
  is_payed: OrderType;
}

export type Orders = Array<Order>;
