import { Component, OnInit } from '@angular/core';

import { ExperienceService } from '../../services/experience.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ExperienceListComponent implements OnInit {

  public lists;
  constructor(private experienceService: ExperienceService) { }

  ngOnInit() {
    this.experienceService.getList().subscribe(exs => {
      this.lists = exs;
    })
  }

}
