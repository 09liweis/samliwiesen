import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { BlogService } form '../../services/blog.service';
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit {
  
  public blog: Blog = {
    _id: '',
    title: '',
    url: '',
    content: '',
    image: ''
  };

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }
  
  submit() {
    this.blogService.submit(this.blog).subscribe(blog => {
      
    });
  }

}
