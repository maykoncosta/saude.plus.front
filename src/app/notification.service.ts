import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSource = new BehaviorSubject<Notification | null>(null);
  public notification$ = this.notificationSource.asObservable();

  showSuccess(message: string) {
    this.notificationSource.next({ message, type: 'success' });
  }

  showError(message: string) {
    this.notificationSource.next({ message, type: 'error' });
  }
}
