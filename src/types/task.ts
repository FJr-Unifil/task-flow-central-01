
export type Priority = 'Alta' | 'Média' | 'Baixa';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: string;
  completed: boolean;
  createdAt: string;
}
