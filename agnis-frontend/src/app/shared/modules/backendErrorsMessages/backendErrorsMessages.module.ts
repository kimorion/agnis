import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendErrorsMessagesComponent } from './components/backend-errors-messages/backend-errors-messages.component';

@NgModule({
  declarations: [BackendErrorsMessagesComponent],
  imports: [CommonModule],
  exports: [BackendErrorsMessagesComponent],
})
export class BackendErrorsMessagesModule {}
