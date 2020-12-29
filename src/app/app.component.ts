import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  currentPage = 'home';
  showLoginModal = false;
  eml = 'weisen.li@hotmail.com';
  pwd = '12345';
  constructor(
    private userService: UserService,
  ) { }
  ngOnInit() {
  }
  ngAfterViewInit() {
  }
  showLogin() {
    this.showLoginModal = true;
  }
  login() {
    var user = {
      eml: this.eml,
      pwd: this.pwd
    };
    this.userService.login(user).subscribe(ret=>{
      console.log(ret);
    });
  }
}
