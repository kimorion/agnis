import { Action, createReducer, on } from '@ngrx/store';
import { UserStateInterface } from '../types/userState.interface';
import {
  UserFetchFailureAction,
  UserFetchStartAction,
  UserFetchSuccessAction,
} from './Actions/user.action';

const initialState: UserStateInterface = {
  selectedUser: null,
  isLoading: false,
  validationErrors: null,
};

const userReducer = createReducer(
  initialState,
  on(
    UserFetchStartAction,
    (state): UserStateInterface => ({
      ...state,
      isLoading: true,
      selectedUser: null,
    }),
  ),
  on(
    UserFetchSuccessAction,
    (state, result): UserStateInterface => ({
      ...state,
      isLoading: false,
      selectedUser: result.user,
    }),
  ),
  on(
    UserFetchFailureAction,
    (state): UserStateInterface => ({
      ...state,
      isLoading: false,
      selectedUser: null,
    }),
  ),
);

export function reducers(state: UserStateInterface, action: Action) {
  return userReducer(state, action);
}
