import { Component, OnInit } from '@angular/core';

import { ExperienceService } from '../../services/experience.service';
import { Experience } from '../../models/experience';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.scss']
})
export class ExperienceFormComponent implements OnInit {

  public experience: Experience;
  constructor(private experienceService: ExperienceService) { }

  ngOnInit() {
  }
  
  add() {
    this.experienceService.add(this.experience).subscribe(ex => {
      
    });
  }

}
