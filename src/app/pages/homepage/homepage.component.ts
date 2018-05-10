import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    // this.projectService.getList().subscribe(projects => {
    //   console.log(projects);
    // })
  }

}
