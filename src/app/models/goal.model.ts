

export class Goal {
  constructor(
      public name: string,
      public isMainGoal: boolean,
      public details: string,
      public category: string,
      public creationDate: Date,
      public endDate: Date,
  ) {}
}


