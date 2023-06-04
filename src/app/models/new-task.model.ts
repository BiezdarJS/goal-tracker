
export class NewTask {
  constructor(
      public goal_id: string,
      public name: string,
      public description: boolean,
      public priority: string,
      public taskDate: Date,
  ) {}
}
