import { setColumns, setTasks } from "../redux/kraftbaseSlice";
import store from "../redux/store";
import { Column, Task } from "../types/kanbanBoardTypes";

export const getTasks = () => {
    const state = store.getState();
    return state.kraftbase.tasks;
};

export const getColumns = () => {
    const state = store.getState();
    return state.kraftbase.columns;
};

export const updateTasks = (tasks: Task[]) => {
    store.dispatch(setTasks(tasks));
};

export const updateColumns = (columns: Column[]) => {
    store.dispatch(setColumns(columns));
};