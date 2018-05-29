import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../services/project.service';
import { ExperienceService } from '../../services/experience.service';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public experiences;
  public projects;
  public blogs;

  constructor(
    private projectService: ProjectService,
    private experienceService: ExperienceService,
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.experienceService.getList().subscribe(exs => {
      this.experiences = exs;
    })
    
    this.projectService.getList().subscribe(projs => {
      this.projects = projs;
    });
    
    this.blogService.getList().subscribe(blogs => {
      this.blogs = blogs;
    })
  }
}
