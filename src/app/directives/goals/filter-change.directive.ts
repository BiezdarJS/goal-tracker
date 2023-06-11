import { Directive, HostListener } from '@angular/core';
import { GoalsNotificationsService } from 'src/app/services/goals/goals-notifications.service';

@Directive({
  selector: '[gtFilterChange]'
})
export class FilterChangeDirective {

  constructor(
    private goalsNotificationsS: GoalsNotificationsService,
  ) {

  }

  @HostListener('change')
  onChange() {
    this.goalsNotificationsS.sendGoalsSelectNotification(true);
  }

}
