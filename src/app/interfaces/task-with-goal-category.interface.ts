import { ITask } from "./task.interface";

export interface ITaskWithGoalCategory extends ITask {
  goalCategory: string;
}

