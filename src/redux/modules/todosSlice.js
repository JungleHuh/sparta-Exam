import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { waitTwoSeconds } from '../../utils'; 

export const __addToDo = createAsyncThunk(
  'todos/addToDo',
  async (newTodo, thunkAPI) => {
    await waitTwoSeconds(); 
    return newTodo;
  }
);

export const __deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id, thunkAPI) => {
    await waitTwoSeconds(); 
    return id;
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__addToDo.fulfilled, (state, action) => {
        state.list.push(action.payload); 
      })
      .addCase(__deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((todo) => todo.id !== action.payload); // 할 일 삭제
      });
  },
});

export default todosSlice.reducer;
