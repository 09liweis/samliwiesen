import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  public project: Project = {
    _id: '',
    title: '',
    description: '',
    link: '',
    features: ['']
  }
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.route.snapshot.params['id'] != 'new') {
      this.project._id = this.route.snapshot.params['id'];
      this.projectService.getDetail(this.project._id).subscribe(p => {
        this.project = p;
      })
    }
  }
  
  addFeature() {
    let features = this.project.features;
    features.push('');
    this.project.features = features;
  }
  updateFeature(event: any, index) {
    let features = this.project.features;
    features[index] = event.target.value;
    this.project.features = features;
  }
  
  submit() {
    this.projectService.submit(this.project).subscribe(ex => {
      
    });
  }

}
