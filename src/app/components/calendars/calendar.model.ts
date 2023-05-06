export enum CalendarType {
    Day = 'day',
    Week = 'week',
    Month ='month'
}


export interface ICalendar {
  year: string;
  month: string;
}

export interface ICalendarExtended extends ICalendar {
  first_day: number;
}

export interface ICalendarDays {
  date: string;
  dayOfMonth: number;
  isCurrentMonth: boolean
}

export interface ICalendarDaysExtended extends ICalendarDays {
  dayOfWeek: number;
}
