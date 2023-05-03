export enum CalendarType {
    Day = 'day',
    Week = 'week',
    Month ='month'
}


export interface ICalendarDay {
  date: string;
  dayOfMonth: number;
  isCurrentMonth: boolean
}


export interface ICalendar {
  year: string;
  month: string;
  first_day: number;
}
