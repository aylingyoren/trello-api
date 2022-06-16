export interface Card {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  estimate: string;
  status: string;
  dueDate: string;
  labels: string[];
  boardId: number;
}
