import { LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  public imagesURL: string = '';

  constructor(
    private locationStrategy: LocationStrategy
  ) {
    this.imagesURL = this.locationStrategy.getBaseHref() + '/assets/images';
  }
}
