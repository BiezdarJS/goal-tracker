import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchNotificationsService {

  // Search Submit Value
  public searchValueSubject: BehaviorSubject<string> = new BehaviorSubject('');
  searchValue = this.searchValueSubject.asObservable();

  setSearchValue(data:string) {
    this.searchValueSubject.next(data);
  }

}
