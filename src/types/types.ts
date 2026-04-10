export interface BoostappClass {
  id: string;
  title: string;
  coach: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  price: number;
  registered: number;
  capacity: number;
  full: boolean;
  closed: boolean;
  area: string | null;
  color: string | null;
}

export interface ScheduleResponse {
  success: boolean;
  classes: BoostappClass[];
  earliestClassDate?: string;
  enableDays?: number;
  error?: string;
}
