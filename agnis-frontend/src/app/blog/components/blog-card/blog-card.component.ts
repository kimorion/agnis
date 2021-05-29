import { Component, Input, OnInit } from '@angular/core';
import { BlogDataInterface } from '../../types/blogData.interface';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent implements OnInit {
  @Input() blogInfoProp: BlogDataInterface | null = null;

  blogInfo: BlogDataInterface | null = null;

  constructor() {
  }

  ngOnInit(): void {
    this.blogInfo = this.blogInfoProp;
  }
}
