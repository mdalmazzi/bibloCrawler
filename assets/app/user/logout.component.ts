import {Component} from "@angular/core";
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-logout',
    template: `
    <div class="col-md-8 col-md-offset-2">
        <button class="btn btn-danger" (click)="onLogout()">Logout</button>
    </div>
    `


})
export class LogoutComponent {
    constructor(private userService: UserService, private router: Router) {}
    onLogout()  {
        this.userService.logout();
        this.router.navigate(['/auth', 'signin']);

    }
}