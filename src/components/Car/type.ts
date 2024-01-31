export type CarData = {
  temp: number;
  wheelsize: number;
  ac: string;
  hwy: {
    kmh: number;
    kilometers: number;
  }[];
};