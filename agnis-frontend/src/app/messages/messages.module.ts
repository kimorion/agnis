import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './components/messages/messages.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'messages', component: MessagesComponent }];

@NgModule({
  declarations: [MessagesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MessagesModule {}
