import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectLoginLoadingStatus = createSelector(
  selectAuthState,
  (state: fromAuth.State): boolean => state.isLoadingLogin
);

export const selectRegisterLoadingStatus = createSelector(
  selectAuthState,
  (state: fromAuth.State): boolean => state.isLoadingRegister
);


export const selectRegisteringStatus = createSelector(
  selectAuthState,
  (state: fromAuth.State): boolean => state.registering
);
