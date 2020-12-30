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
  nm = '';
  lts = '';
  isLogin = true;
  constructor(
    private userService: UserService,
  ) { }
  ngOnInit() {
    this.getUserDetail();
  }
  getUserDetail() {
    const detailInfo = this.userService.detail();
    if (detailInfo) {
      detailInfo.subscribe(ret => {
        if (ret && ret.user) {
          this.isLogin = false;
          this.nm = ret.user.nm;
          this.lts = ret.user.lts;
        }
      });
    }
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
      if (ret.token) {
        localStorage.setItem('auth-token',ret.token);
        this.showLoginModal = false;
        this.getUserDetail();
        window.location.reload();
      }
    });
  }
  logout() {
    this.isLogin = false;
    localStorage.setItem('auth-token','');
    this.nm = '';
    this.lts = '';
    window.location.reload();
  }
}
