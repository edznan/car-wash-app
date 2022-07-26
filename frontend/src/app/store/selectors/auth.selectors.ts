import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectLoadingStatus = createSelector(
  selectAuthState,
  (state: fromAuth.State): boolean => state.isLoading
);

export const selectRegisteringStatus = createSelector(
  selectAuthState,
  (state: fromAuth.State): boolean => state.registering
);
