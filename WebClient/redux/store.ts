import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userReducer } from './slices/user';
import { createWrapper } from 'next-redux-wrapper';
import { projectReducer } from "./slices/project";
import { kanbanReducer } from './slices/kanban';
export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      project: projectReducer,
      kanban: kanbanReducer
    }
  })
}

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);