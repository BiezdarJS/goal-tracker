

export class NewGoal {
  constructor(
      public name: string,
      public isMainGoal: boolean,
      public details: string,
      public category: string,
      public lifeArea: string,
      public creationDate: string,
      public priority: string,
      public endDate: Date,

  ) {}
}


