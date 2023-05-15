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
