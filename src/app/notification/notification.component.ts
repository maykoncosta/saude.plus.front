import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  message: string = '';

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notification$.subscribe(msg => {
      this.message = msg;
      // Definir um tempo para a mensagem desaparecer
      setTimeout(() => this.message = '', 3000);
    });
  }
}
