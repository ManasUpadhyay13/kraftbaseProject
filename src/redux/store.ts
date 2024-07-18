import { configureStore } from '@reduxjs/toolkit';
import kraftbaseReducer from './kraftbaseSlice';

const store = configureStore({
    reducer: {
        kraftbase: kraftbaseReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
