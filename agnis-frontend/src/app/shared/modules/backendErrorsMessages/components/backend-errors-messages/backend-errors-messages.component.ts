import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from '../../../../types/backendErrors.interface';

@Component({
  selector: 'app-backend-errors-messages',
  templateUrl: './backend-errors-messages.component.html',
  styleUrls: ['./backend-errors-messages.component.scss'],
})
export class BackendErrorsMessagesComponent implements OnInit {
  @Input() backendErrorsProps: BackendErrorsInterface | null = null;

  backendErrors: BackendErrorsInterface | null = null;

  constructor() {
  }

  ngOnInit(): void {
    this.backendErrors = this.backendErrorsProps;
  }
}
