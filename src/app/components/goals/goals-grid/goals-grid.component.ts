import { AfterContentInit, Component, ElementRef } from '@angular/core';
// Services
import { GlobalVariablesService } from 'src/app/services/global-variables.service';
import { CalendarService } from 'src/app/services/calendar.service';
// Interfaces
import { IGoalsGrid, ICalendarMonths } from '../../../models/calendar.model';
// Day.js
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import { GoalsCalendarService } from 'src/app/services/goals-calendar.service';
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

@Component({
  selector: 'gt-goals-grid',
  templateUrl: './goals-grid.component.html',
  host: {'class': 'goals-grid goals-grid--box'},
  styleUrls: ['./goals-grid.component.scss']
})
export class GoalsGridComponent implements AfterContentInit {

  public imagesURL: string = '';


  firstYearMonths!: any;
  secondYearMonths!: any;
  MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  selectedMonth:any;
  calendar!: IGoalsGrid;


  constructor(
    private globalVars: GlobalVariablesService,
    private elementRef: ElementRef,
    private goalsCalendarService: GoalsCalendarService
  ) {}




  ngAfterContentInit():void {
    // Goals Grid
    this.calendar = {
      year: this.goalsCalendarService.selectedMonth.format("YYYY"),
      month: this.goalsCalendarService.selectedMonth.format("M"),
      first_month: parseInt(this.goalsCalendarService.selectedMonth.format("M"), 10)
    }
    this.createCalendar(this.calendar);
  }

  ngAfterContentChecked():void {
    // Goals Grid
    this.calendar = {
      year: this.goalsCalendarService.selectedMonth.format("YYYY"),
      month: this.goalsCalendarService.selectedMonth.format("M"),
      first_month: parseInt(this.goalsCalendarService.selectedMonth.format("M"), 10)
    }
    this.createCalendar(this.calendar);
  }



  createCalendar(calendar: IGoalsGrid) {

    this.removeAllMonthElements(this.elementRef.nativeElement);

    this.firstYearMonths = this.createFirstYearMonths(calendar);
    this.secondYearMonths = this.createSecondYearMonths(calendar);
    const months = [...this.firstYearMonths, ...this.secondYearMonths];

    months.forEach((month) => { this.appendMonth(month, this.elementRef.nativeElement) });
  }

  appendMonth(month:any, goalsGrid:any) {

    const monthOfTheYear = month.monthOfYear-1 !== -1 ? month.monthOfYear : 0;

    const monthElement = `
      <div class="calendar-grid__column calendar-grid__column--day">
      <p class="title txt-center">
        ${this.MONTHS[monthOfTheYear]}
      </p>
      <ul class="task-list list">
        <li class="goals-grid__item">
            <div class="goal-item">
                <div class="goal-item__img-wrap">
                    <div class="label label-title label-title--red">
                        self-knowledge
                    </div>
                    <img class="goal-item__img" src="http://localhost:4200/assets/images/self-knowledge.jpg" alt="">
                </div>
                <ul class="goal-item-misc list">
                    <li class="goal-item-misc__item">
                        <i class="icon icon--sm icon--edit"></i>
                    </li>
                    <li class="goal-item-misc__item">
                        <i class="icon icon--sm icon--chart"></i>
                    </li>
                </ul>
                <h3 class="headline txt-center">
                    Prepare & pass the TOEFL exam
                </h3>
                <p class="font-body">
                    TOEFL - international exam in English as a foreign language. Goal - Prepare and pass the TOEFL iBT
                    exam with 80-100 points 2022 May 10.
                </p>
            </div>
        </li>
      </ul>
      </div>
    `;
    goalsGrid.innerHTML += monthElement;

  }

  createFirstYearMonths(calendar:IGoalsGrid) {

    let visibleNumberOfMonthsFromFirstYear = 11 - calendar.first_month;
    visibleNumberOfMonthsFromFirstYear = visibleNumberOfMonthsFromFirstYear <= 3 ? visibleNumberOfMonthsFromFirstYear : 0;


    return [...Array(visibleNumberOfMonthsFromFirstYear)].map((month, index) => {
        const firstYearMonths: ICalendarMonths = {
        date: dayjs(
          `${calendar.year}-${calendar.month}-${calendar.first_month+index}`
        ).format("YYYY-MM-DD"),
        monthOfYear: dayjs(`${calendar.year}-${parseInt(calendar.month,10)+index}-1`).month(),
      };
      return firstYearMonths;
    });
  }


  createSecondYearMonths(calendar:IGoalsGrid) {

    let visibleNumberOfMonthsFromFirstYear = 11 - calendar.first_month;
    visibleNumberOfMonthsFromFirstYear = visibleNumberOfMonthsFromFirstYear <= 3 ? visibleNumberOfMonthsFromFirstYear : 0;

    let numberOfSecondMonthDays = 3 - visibleNumberOfMonthsFromFirstYear;
    // console.log(numberOfSecondMonthDays);

    let first_month = dayjs(`${calendar.year}-${calendar.month}-1`).add(visibleNumberOfMonthsFromFirstYear, "month");
    // console.log(first_month);
    // first_month = ;
    let first_month_of_second_year = dayjs(first_month).month();
    // console.log(first_month_of_second_year);
    // console.log(first_month);


    let month = visibleNumberOfMonthsFromFirstYear > 0 ? parseInt(calendar.month,10) + 1 : calendar.month;

    return [...Array(numberOfSecondMonthDays)].map((day, index) => {
      const secondYearMonths: ICalendarMonths = {
        date: dayjs(`${calendar.year}-${parseInt(calendar.month,10)+index}-1`).format("YYYY-MM-DD"),
        monthOfYear: dayjs(`${calendar.year}-${parseInt(calendar.month,10)+index}-1`).month(),
      };
      return secondYearMonths;
    });
  }


  getNumberOfDaysInMonth(year:any, month:any) {
    return dayjs(`${year}-${month}-01`).daysInMonth();
  }


  removeAllMonthElements(goalsGrid:any) {
    let first = goalsGrid.firstElementChild;
    while (first) {
      first.remove();
      first = goalsGrid.firstElementChild;
    }
  }
}
