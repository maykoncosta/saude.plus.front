import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './notification.component';
import { NotificationService } from '../notification.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [NotificationComponent, ],
  exports: [NotificationComponent,],
  providers: []
})
export class NotificationModule {}
