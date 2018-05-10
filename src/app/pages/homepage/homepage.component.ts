import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../services/project.service';
import { ExperienceService } from '../../services/experience.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    private experienceService: ExperienceService
  ) { }

  ngOnInit() {
    this.experienceService.getList().subscribe(exs => {
      console.log(exs);
    })
  }

}
