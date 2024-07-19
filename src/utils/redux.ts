import { setColumns, setLabel, setSearch, setSort, setTasks } from "../redux/kraftbaseSlice";
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

export const getSearchString = () => {
    const state = store.getState()
    return state.kraftbase.search
}

export const getSort = () => {
    const state = store.getState()
    return state.kraftbase.sort
}

export const getLabel = () => {
    const state = store.getState()
    return state.kraftbase.label
}

export const updateTasks = (tasks: Task[]) => {
    store.dispatch(setTasks(tasks));
};

export const updateColumns = (columns: Column[]) => {
    store.dispatch(setColumns(columns));
};

export const updateSearch = (newSearch: string) => {
    store.dispatch(setSearch(newSearch))
}

export const updateSort = (newValue: boolean) => {
    store.dispatch(setSort(newValue))
}

export const updateLabel = (newValue: string) => {
    store.dispatch(setLabel(newValue))
}