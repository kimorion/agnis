import { Component, Input, OnInit } from '@angular/core';
import { PostDataInterface } from '../../types/postData.interface';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  @Input() postsProp: PostDataInterface[] | null = null;

  constructor() {}

  ngOnInit(): void {}
}
