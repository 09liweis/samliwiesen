import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  public projects;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    
    this.projectService.getList().subscribe(projs => {
      this.projects = projs;
    })
    
  }

}
