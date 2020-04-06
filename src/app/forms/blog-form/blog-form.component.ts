import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { BlogService } from '../../services/blog.service';
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
    image: '',
    category: '',
    published: '1'
  };

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.route.snapshot.params['id'] != 'new') {
      this.blog._id = this.route.snapshot.params['id'];
      this.blogService.getDetail(this.blog._id).subscribe(b => {
        this.blog = b;
      })
    } else {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const m = month > 9 ? month : `0${month + 1}`;
      const day = now.getDate();
      const d = day > 9 ? day : `0${day}`;
      this.blog.url = `${year}-${m}-${d}`;
    }
  }
  
  ngAfterViewInit() {
    console.log('test');
  }
  
  submit(back: boolean):void {
    this.blogService.submit(this.blog).subscribe(blog => {
      if (blog) {
        alert('保存成功啦～～～～')
      }
      if (back) {
        this.router.navigate(['/']); 
      }
    });
  }
  
  delete(id: string): void {
    this.blogService.delete(id).subscribe(res => {
      if (res == 'ok') {
        this.router.navigate(['/']);
      }
    });
  }
}
