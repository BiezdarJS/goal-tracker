
export class NewTask {
  constructor(
      public name: string,
      public description: boolean,
      public priority: string,
      public taskDate: Date,
  ) {}
}
