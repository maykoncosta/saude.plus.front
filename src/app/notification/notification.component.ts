import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  message: string = '';
  type: 'success' | 'error' = 'success';

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notification$.subscribe(notification => {
      if (notification) {
        this.message = notification.message;
        this.type = notification.type;
        setTimeout(() => this.message = '', 3000);
      }
    });
  }
}
