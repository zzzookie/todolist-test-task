import { createSlice } from "@reduxjs/toolkit"
import { RootState, TodoPoint } from "../types";

const initialState: TodoPoint[] = [
  {
    id: 1,
    description: 'Test task',
    checked: false,
  },
  {
    id: 2,
    description: 'Completed task',
    checked: true,
  },
]

function getId(state: TodoPoint[]): number {
  const ids = state.map(s => s.id);
  let newId: number = 0;
  while (newId === 0 || ids.some((id) => id === newId)) {
    newId = Math.round(Math.random() * 100000000)
  }
  return newId;
}

export const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		add: (state, {payload}) => {
			const newTodo = {
        id: getId(state),
        description: payload,
        checked: false,
      }
      return [newTodo].concat(state);
		},
    check: (state, {payload}) => {
      return state.map(td => td.id === payload ? {...td, checked: !td.checked } : td) 
    },
    delete: (state, {payload}) => {
      return state.filter(td => td.id !== payload) 
    },
    clearCompleted: (state) => {
      return state.filter(td => td.checked === false);
    }
	}
})

export const todoReducer = todoSlice.reducer;
export const todoActions = todoSlice.actions;
export const selectTodosAll = (state: RootState): TodoPoint[] => state.todos
export const selectTodosActive = (state: RootState): TodoPoint[] => state.todos.filter(td => td.checked === false)
export const selectTodosCompleted = (state: RootState): TodoPoint[] => state.todos.filter(td => td.checked === true)
