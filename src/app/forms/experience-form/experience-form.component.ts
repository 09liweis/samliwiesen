import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { ExperienceService } from '../../services/experience.service';
import { Experience } from '../../models/experience';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.scss']
})
export class ExperienceFormComponent implements OnInit {

  public experience: Experience = {
    title: '',
    company: '',
    start_date: '',
    end_date: '',
    duty: ['']
  };
  constructor(
    private experienceService: ExperienceService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }
  
  add() {
    this.experienceService.add(this.experience).subscribe(ex => {
      
    });
  }

}
