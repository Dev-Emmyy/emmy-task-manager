export interface Task {
  id: string;
  title: string;
  assignee: string;
  status: string;
  project: string;
  dueDate: string;
  priority: string;
  description: string;
  subtasks: string[];
  comments: string[];
}