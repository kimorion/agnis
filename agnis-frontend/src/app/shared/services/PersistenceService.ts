import { Injectable } from '@angular/core';

@Injectable()
export class PersistenceService {
  public static readonly USER_ID_KEY = 'currentUserId';

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key)!);
    } catch (e) {
      console.error('Error getting data from localStorage');
      return null;
    }
  }

  tryRemove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error remove key: ${key} from localStorage`, e);
    }
  }

  tryGet<TResult>(key: string): TResult | null {
    try {
      return JSON.parse(localStorage.getItem(key)!);
    } catch (e) {
      return null;
    }
  }
}
