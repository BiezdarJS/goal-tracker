// use interface instead class for TS
export interface ITask {
  goal_id: string;
  name: string;
  description: string;
  priority: string;
  taskDate: string;
  id: string; // key collection
}

