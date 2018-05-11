import { Component, OnInit } from '@angular/core';

import { ExperienceService } from '../../services/experience.service';

@Component({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.scss']
})
export class ExperienceListComponent implements OnInit {

  public experiences;
  constructor(private experienceService: ExperienceService) { }

  ngOnInit() {
    this.experienceService.getList().subscribe(exs => {
      this.experiences = exs;
    })
  }

}
