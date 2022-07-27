import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/shared/models/user';
import * as AuthActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  fromData: any;
  error: any;
  user: User;
  isLoadingLogin: boolean;
  isLoadingRegister: boolean;
  registering: boolean;
  token: string;
}

export const initialState: State = {
  fromData: null,
  error: null,
  user: {
    id: 0,
    name: '',
    email: '',
    emailVerified: false,
    numberOfWashes: 0,
    moneySpent: 0,
    isAdmin: false
  },
  isLoadingLogin: false,
  isLoadingRegister: false,
  registering: true,
  token: ''
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.loginPage, (state, action) => {
    return {
      ...state,
      isLoadingLogin: true,
      isLoadingRegister: false
    }
  }),
  on(AuthActions.registerPage, (state, action) => {
    return {
      ...state,
      isLoadingLogin: false,
      isLoadingRegister: true,
      registering: true
    }
  }),
  on(AuthActions.loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.data.user,
      isLoadingLogin: false,
      isLoadingRegister: false,
      token: action.data.token
    }
  }),
  on(AuthActions.loginFail, (state, action) => {
    return {
      ...state,
      user: {
        name: '',
        email: '',
        emailVerified: false,
        numberOfWashes: 0,
        moneySpent: 0,
        isAdmin: false
      },
      isLoadingLogin: false,
      isLoadingRegister: false,
      error: action.error
    }
  }),
  on(AuthActions.registerSuccess, (state, action) => {
    return {
      ...state,
      user: action.data,
      isLoadingLogin: false,
      isLoadingRegister: false,
      registering: false
    }
  }),
  on(AuthActions.registerFail, (state, action) => {
    return {
      ...state,
      user: {
        name: '',
        email: '',
        emailVerified: false,
        numberOfWashes: 0,
        moneySpent: 0,
        isAdmin: false
      },
      isLoadingLogin: false,
      isLoadingRegister: false,
      error: action.error,
      registering: true
    }
  }),
);
