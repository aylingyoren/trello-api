export interface CardI {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  estimate: string;
  status: string;
  dueDate: Date;
  labels: string[];
  boardId: number;
}
