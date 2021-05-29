import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { AppStateInterface } from '../../../types/appState.interface';
import { ModuleStateInterface } from '../types/moduleState.interface';

export const baseFeatureSelector: MemoizedSelector<
  AppStateInterface,
  ModuleStateInterface
> = createFeatureSelector<AppStateInterface, ModuleStateInterface>('base');
