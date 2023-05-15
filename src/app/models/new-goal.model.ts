
export class NewGoal {
  constructor(
      public name: string,
      public isMainGoal: boolean,
      public details: string,
      public category: string,
      public lifeArea: string,
      public creationDate: Date,
      public attachments: File,
      public priority: string,
      public endDate: Date,

  ) {}
}