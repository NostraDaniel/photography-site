import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.services';
import { NotificatorService } from 'src/app/core/services/notificator.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private subscription: Subscription;
  private isLogged: boolean = false;

  constructor(
    private readonly notificator: NotificatorService,
    private readonly auth: AuthService
  ) { }

  ngOnInit() {
    this.subscription = this.auth.user$.subscribe(
      username => {
        if (username === null) {
          this.isLogged = false;
        } else {
          this.isLogged = true;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
