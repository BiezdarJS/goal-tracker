import { Task } from "../models/task.model";

export interface ITaskWithNumber extends Task {
  number: number,
};
