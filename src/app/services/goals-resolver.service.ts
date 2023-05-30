import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, map } from "rxjs";
import { GoalsService } from "src/app/services/goals.service";

@Injectable({ providedIn: 'root' })
export class GoalsResolverService implements Resolve<any> {


  constructor(private goalsService: GoalsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.goalsService.fetchGoals()
  }
}
