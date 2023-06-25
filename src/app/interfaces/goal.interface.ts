// Base Goal Model
export interface IGoal {
  id: string;
  name: string;
  isMainGoal: boolean;
  details: string;
  category: string;
  lifeArea: string;
  creationDate: string;
  priority: string;
  endDate: Date;
}
