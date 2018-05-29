import { Component, OnInit } from '@angular/core';

import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  public blogs;

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getList().subscribe(blogs => {
      this.blogs = blogs;
    })
  }

}
