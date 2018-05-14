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
    _id: '',
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
    if (this.route.snapshot.params['id'] != 'new') {
      this.experience._id = this.route.snapshot.params['id'];
      this.experienceService.getDetail(this.experience._id).subscribe(e => {
        this.experience = e;
      })
    }
  }
  
  addDuty() {
    let duty = this.experience.duty;
    duty.push('');
    this.experience.duty = duty;
  }
  
  submit() {
    this.experienceService.submit(this.experience).subscribe(ex => {
      
    });
  }

}
