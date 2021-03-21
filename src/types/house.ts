export interface House {
  id: number;
  img: string;
  title: string;
  info: string;
  msg: string;
  price: string;
  publishTime?: number;
  startTime?: number;
  endTime?: number;
}

export interface HouseDetail {
  id: number;
  banner: string[];
  info: House;
}

export type Houses = Array<House>;
