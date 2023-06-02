import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, OnChanges, OnDestroy, OnInit } from '@angular/core';
// Types
import { Goal } from 'src/app/types/goal.type';
// Services
import { GlobalVariablesService } from 'src/app/services/global-variables.service';
import { GoalsService } from 'src/app/services/goals.service';
// Interfaces
import { IGoalsGrid, ICalendarMonths } from '../../../models/calendar.model';
// Day.js
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import { GoalsMainComponent } from '../_goals-main/goals-main.component';
import { map } from 'rxjs';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

@Component({
  selector: 'gt-goals-grid',
  templateUrl: './goals-grid.component.html',
  host: {'class': 'goals-grid goals-grid--box'},
  styleUrls: ['./goals-grid.component.scss']
})
export class GoalsGridComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {


  public loading$!: boolean;
  public imagesURL: string = '';

  firstYearMonths!: any;
  secondYearMonths!: any;
  monthNames = this.goalsService.monthNames;
  selectedMonth:any;
  calendar!: IGoalsGrid;
  monthsCollection!: any;
  allGoals: Array<Goal> = [];
  // select values
  selectCategoryValue!: string;
  selectDateValue = 'all';
  objectValues = Object.values;


  constructor(
    private globalVars: GlobalVariablesService,
    private elementRef: ElementRef,
    private parentRef: GoalsMainComponent,
    private goalsService: GoalsService
  ) {}

  ngOnInit():void {
    this.loading$ = false;
    this.imagesURL = this.globalVars.imagesURL;
  }


  // ngAfterContentInit():void {
  //   // Goals Grid
  //   this.calendar = {
  //     year: this.goalsService.selectedMonth.format("YYYY"),
  //     month: this.goalsService.selectedMonth.format("M"),
  //     first_month: parseInt(this.goalsService.selectedMonth.format("M"), 10)
  //   }
  //   this.monthsCollection = this.collectMonths(this.calendar);
  // }


  ngAfterContentInit():void {
    this.loading$ = true;
    // Goals Grid
    this.calendar = {
      year: this.goalsService.selectedMonth.format("YYYY"),
      month: this.goalsService.selectedMonth.format("M"),
      first_month: parseInt(this.goalsService.selectedMonth.format("M"), 10)
    }
    this.monthsCollection = this.collectMonths(this.calendar);
  }
  //  ngAfterContentChecked():void {
  //   // Goals Grid
  //   this.calendar = {
  //     year: this.goalsService.selectedMonth.format("YYYY"),
  //     month: this.goalsService.selectedMonth.format("M"),
  //     first_month: parseInt(this.goalsService.selectedMonth.format("M"), 10)
  //   }
  //   this.monthsCollection = this.collectMonths(this.calendar);
  // }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.goalsService.fetchGoals()
        .pipe(
          map(response => {
            const goalsArray = [];
            for (const key in response) {
              if (response.hasOwnProperty(key)) {
                goalsArray.push({ ...response[key], id: key })
              }
            }
            return goalsArray;
          }),
          map(response => {
            // Filtrowanie po Kategorii
            if (this.selectCategoryValue !== 'all') {
              response = response.filter(v => v.category === this.selectCategoryValue)
            }
            // Sortowanie po Dacie
            if (this.selectDateValue === 'creation date') {
              let creationDates = response.map(item => item.creationDate.split('-')).map(item => {
                return {
                  timepstamp: new Date(item[0], item[1]-1, item[2]).getTime()
                }
              }).map(item => item.timepstamp);
              response = response.map((item, idx, array) => {
                return {
                  category: item.category,
                  creationDate: creationDates[idx],
                  details: item.details,
                  id: item.id,
                  isMainGoal: item.isMainGoal,
                  name: item.name
                }
              })
              // sortowanie
              .sort((item1, item2) => item1.creationDate - item2.creationDate);
            }
            return response;
            })
        )
        .subscribe((goals:any) => {
          this.allGoals = goals;
          this.loading$ = false;
        })
    }, 550);
  }



  ngOnDestroy():void {
    // this.loading$ = false;
  }

  // ngAfterContentChecked():void {
  //   // Goals Grid
  //   this.calendar = {
  //     year: this.goalsService.selectedMonth.format("YYYY"),
  //     month: this.goalsService.selectedMonth.format("M"),
  //     first_month: parseInt(this.goalsService.selectedMonth.format("M"), 10)
  //   }
  //   this.monthsCollection = this.collectMonths(this.calendar);
  // }



  collectMonths(calendar: IGoalsGrid) {

    this.removeAllMonthElements(this.elementRef.nativeElement);

    this.firstYearMonths = this.createFirstYearMonths(calendar);
    this.secondYearMonths = this.createSecondYearMonths(calendar);
    const months = [...this.firstYearMonths, ...this.secondYearMonths];

    return months;

    // months.forEach((month) => { this.appendMonth(month, this.elementRef.nativeElement) });
  }

  appendMonth(month:any, goalsGrid:any) {

    const monthOfTheYear = month.monthOfTheYear-1 !== -1 ? month.monthOfTheYear : 0;

    const monthElement = `
      <div class="calendar-grid__column calendar-grid__column--day">
      <p class="title txt-center">

      </p>
      <ul class="goals-list list">
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
        monthOfTheYear: dayjs(`${calendar.year}-${parseInt(calendar.month,10)+index}-1`).month(),
      };
      return firstYearMonths;
    });
  }


  createSecondYearMonths(calendar:IGoalsGrid) {

    let visibleNumberOfMonthsFromFirstYear = 11 - calendar.first_month;
    visibleNumberOfMonthsFromFirstYear = visibleNumberOfMonthsFromFirstYear <= 3 ? visibleNumberOfMonthsFromFirstYear : 0;

    let numberOfSecondYearMonths = 3 - visibleNumberOfMonthsFromFirstYear;

    let first_month = dayjs(`${calendar.year}-${calendar.month}-1`).add(visibleNumberOfMonthsFromFirstYear, "month");
    // first_month = ;
    let first_month_of_second_year = dayjs(first_month).month();


    let month = visibleNumberOfMonthsFromFirstYear > 0 ? parseInt(calendar.month,10) + 1 : calendar.month;

    return [...Array(numberOfSecondYearMonths)].map((day, index) => {
      const secondYearMonths: ICalendarMonths = {
        date: dayjs(`${calendar.year}-${parseInt(calendar.month,10)+index}-1`).format("YYYY-MM-DD"),
        monthOfTheYear: dayjs(`${calendar.year}-${parseInt(calendar.month,10)+index}-1`).month(),
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
