import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { ExperienceService } from '../../services/experience.service';
import { BlogService } from '../../services/blog.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {

  public results;
  public page:String;
  constructor(
    private experienceService: ExperienceService,
    private blogService: BlogService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.page = this.route.snapshot.params.page
    switch (this.page) {
      case 'experiences':
        this.experienceService.getList().subscribe(exs => {
          this.results = exs;
        });
        break;
      case 'blogs':
        this.blogService.getList().subscribe(exs => {
          this.results = exs;
        });
        break;
      case 'projects':
        this.projectService.getList().subscribe(exs => {
          this.results = exs;
        });
        break;
      default:
        break;
    }
  }

}
