import { Component, OnInit } from '@angular/core';

import { ExperienceService } from '../../services/experience.service';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.scss']
})
export class ExperienceFormComponent implements OnInit {

  constructor(private experienceService: ExperienceService) { }

  ngOnInit() {
  }
  
  add() {
    this.experienceService.add(this.experience).subscribe(ex => {
      
    });
  }

}
