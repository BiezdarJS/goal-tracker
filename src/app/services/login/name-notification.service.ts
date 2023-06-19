import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NameNotificationService {

  constructor() { }

  public nameSubject: BehaviorSubject<string> = new BehaviorSubject('');

  setName(data:string) {
    this.nameSubject.next(data);
  }

}
