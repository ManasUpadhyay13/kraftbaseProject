import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Column, Task } from '../types/kanbanBoardTypes';

type KraftbaseStore = {
  tasks: Task[];
  columns: Column[];
  search: string;
  sort: boolean,
  label: string
};

const initialState: KraftbaseStore = {
  tasks: [],
  columns: [],
  search: '',
  sort: false,
  label: ""
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
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSort: (state, action: PayloadAction<boolean>) => {
      state.sort = action.payload;
    },
    setLabel: (state, action: PayloadAction<string>) => {
      state.label = action.payload;
    },
  },
});

export const { setTasks, setColumns, setSearch, setSort, setLabel } = kraftbaseSlice.actions;

export default kraftbaseSlice.reducer;
