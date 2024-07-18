import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Column, Task } from '../types/kanbanBoardTypes';

type KraftbaseStore = {
  tasks: Task[];
  columns: Column[];
};

const initialState: KraftbaseStore = {
  tasks: [],
  columns: []
};

const kraftbaseSlice = createSlice({
  name: 'kraftbase',
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = action.payload;
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  }
});

export const { setTasks, setColumns } = kraftbaseSlice.actions;

export default kraftbaseSlice.reducer;
