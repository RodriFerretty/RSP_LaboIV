import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  public isMenuCollapsed = true;

  constructor(public userService: UserService, public authService: AuthService) { }

  ngOnInit(): void {
  }

  public isLoggedIn(): boolean {
    console.log("this.userService.getCurrentUser(): ", this.userService.getCurrentUser())
    return (this.userService.getCurrentUser() != null)
  }

  public getDisplayName(): string {
    return this.userService.getCurrentUser().displayName
  }

}
