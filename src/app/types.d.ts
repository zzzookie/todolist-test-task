export interface TodoPoint {
  id: number;
  description: string;
  checked: boolean;
}

export interface RootState {
  todos: TodoPoint[];
}
