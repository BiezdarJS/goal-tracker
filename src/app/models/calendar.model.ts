export enum CalendarType {
    Day = 'day',
    Week = 'week',
    Month ='month'
}


export interface ICalendar {
  year: string;
  month: string;
}
export interface ICalendarExtendedWithDay extends ICalendar {
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

export interface ICalendarDay {
  date: string;
  dayOfMonth: number;
  isCurrentMonth: boolean
}

// Goals Grid

export interface IGoalsGrid {
  year: string;
  month: string;
  first_month: number;
}
export interface ICalendarMonths {
  date: string;
  monthOfTheYear: number;
}
