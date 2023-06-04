import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GoalsService } from 'src/app/services/goals/goals.service';
import { GoalsMainComponent } from '../_goals-main/goals-main.component';
// New Goal
import { NewGoal } from 'src/app/models/new-goal.model';

// Modal
declare function Modal(): void;
// Select
declare function Select(): void;

@Component({
  selector: 'gt-new-goal',
  templateUrl: './new-goal.component.html',
  host: {'class': 'modal__wrap'},
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./new-goal.component.scss']
})
export class NewGoalComponent implements OnInit, AfterViewInit {

  @ViewChild('submitBtn') submitBtn!: ElementRef<HTMLInputElement>;
  @ViewChildren('newGoalStep') newGoalSteps!: QueryList<ElementRef>;
  @ViewChildren('progressBarStep') progressBarSteps!: QueryList<ElementRef>;
  @ViewChild('select_category') select_category!: ElementRef;

  @Output('create') create = new EventEmitter();


  newGoal:any;
  btnBackIsActive: boolean = false;
  btnNextIsActive: boolean = false;
  btnCreateIsActive: boolean = false;

  constructor(
    private elRef: ElementRef,
    private parentRef: GoalsMainComponent,
    private goalsService: GoalsService
  ) {}

  ngOnInit():void {
    // states
    this.btnBackIsActive = false;
    this.btnNextIsActive = true;
    this.btnCreateIsActive = false;
    // modal
    this.newGoal = new (Modal as any)({
      el: this.elRef.nativeElement,
      backdrop: 'static'
    });
    this.newGoal.show();

  }

  ngAfterViewInit():void {
    // Select
    new (Select as any)(this.select_category.nativeElement, {
      placeholder: 'Select Category...'
    });
  }

  closeModal() {
    this.newGoal.hide();
  }

  handleBackAndNextBtn() {
    this.newGoalSteps.toArray().forEach((item, idx) => {
      if (item.nativeElement.classList.contains('active')) {
        // w tym momencie usuń z każdego done
        this.progressBarSteps.toArray().forEach(item => {
          item.nativeElement.classList.remove('done');
        });
        // dodaj done dla każdego z indexem równym i niższym do indeksu aktywnego kroku
        for (let i = 0; i <= idx; i++) {
          this.progressBarSteps.toArray()[i].nativeElement.classList.add('done');
        };
      }
    });
    // btn back
    if (!this.newGoalSteps.first.nativeElement.classList.contains('active')) {
      this.btnBackIsActive = true;
    } else {
      this.btnBackIsActive = false;
    }
    // btn next
    if (!this.newGoalSteps.last.nativeElement.classList.contains('active')) {
      this.btnNextIsActive = true;
      this.btnCreateIsActive = false;
    } else {
      this.btnNextIsActive = false;
      this.btnCreateIsActive = true;
    }
  }

  showNextStep(e:Event) {
    e.preventDefault();
    // handle modalSteps
    let results = this.newGoalSteps.toArray();
    let index: number;
    this.newGoalSteps.forEach((item, idx) => {
      if (item.nativeElement.classList.contains('active')) {
        index = idx === 2 ? -1 : idx;
      }
    });
    this.newGoalSteps.forEach(item => {
      item.nativeElement.classList.remove('active');
    });
    results.filter((el, idx) => idx === index + 1)[0].nativeElement.classList.add('active');
    // handle back and next btn
    this.handleBackAndNextBtn();
  }

  showPrevStep(e:Event) {
    e.preventDefault();
    // handle modalSteps
    let results = this.newGoalSteps.toArray();
    let index: number;
    this.newGoalSteps.forEach((item, idx) => {
      if (item.nativeElement.classList.contains('active')) {
        index = idx === -1 ? 2 : idx;
      }
    });
    this.newGoalSteps.forEach(item => {
      item.nativeElement.classList.remove('active');
    });
    results.filter((el, idx) => idx == index - 1)[0].nativeElement.classList.add('active');
    // handle back and next btn
    this.handleBackAndNextBtn();
  }

  triggerFormSubmit(submitBtn: any) {
    this.submitBtn.nativeElement.click();
  }


  // FORM
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.goalsService.newGoal = new NewGoal(
      form.value.name,
      form.value.isMainGoal,
      form.value.details,
      form.value.select_category,
      form.value.lifeArea,
      form.value.creationDate,
      form.value.attachments,
      form.value.priority,
      form.value.endDate
    );
    this.goalsService.postGoal();
    this.parentRef.removeNewGoal();
    this.parentRef.removeGoalsGrid();
  }


}
