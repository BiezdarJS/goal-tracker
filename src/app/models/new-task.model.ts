
export class NewTask {
  constructor(
      public goal_id: string,
      public name: string,
      public description: string,
      public priority: string,
      public taskDate: string,
  ) {}
}
