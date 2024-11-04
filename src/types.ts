export type Location = 'Ph II New Campus' | 'Ph I Parking Lot';
export type DayType = 'weekday' | 'weekend';

export interface BusTime {
  id: number;
  phII: string;
  phI: string | 'Return Immediately';
}

export interface Schedule {
  weekday: BusTime[];
  weekend: BusTime[];
}