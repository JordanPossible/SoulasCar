import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';
  current_users={};
  is_logged={};

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this._authService.me()
    .subscribe(res => {
      if(res.error){
        this.current_users = res
      }else{
        this.current_users = res[0]
      }
    });
  }

  logout() {
    this._authService.logout()
    .subscribe(res => {
      this.me()
    });
  }

  me(){
    this._authService.me()
    .subscribe(res => {
      if(res.error){
        this.current_users = res
      }else{
        this.current_users = res[0]
      }
    });
  }
}
