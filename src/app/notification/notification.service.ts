import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSource = new Subject<string>();
  notification$ = this.notificationSource.asObservable();

  show(message: string) {
    this.notificationSource.next(message);
  }
}
