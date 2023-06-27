import { Component, EventEmitter, Output } from '@angular/core';
// Services
import { SearchNotificationsService } from 'src/app/services/search/search-notifications.service';

@Component({
  selector: 'gt-search-input',
  templateUrl: './search-input.component.html',
  host: {'class': 'form-field form-field--search'},
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {

  constructor(
    private SearchNotificationsS: SearchNotificationsService
  ) {}

  enteredSearchValue:string = '';

  // @Output()
  // searchTextChanged: EventEmitter<string> = new EventEmitter<string>();



  onSearchTextChanged() {
    this.SearchNotificationsS.setSearchValue(this.enteredSearchValue);
  }

}
