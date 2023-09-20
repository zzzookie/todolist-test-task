import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./todos";

export const store = configureStore({
	reducer: {
		todos: todoReducer,
	}
});
