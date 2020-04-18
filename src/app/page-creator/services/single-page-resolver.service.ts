import { Injectable } from '@angular/core';
import { PagesService } from 'src/app/core/services/pages.service';
import { NotificatorService } from 'src/app/shared/services/notificator.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SinglePageResolverService {

  constructor(
    private readonly pagesService: PagesService,
    private readonly notificator: NotificatorService
  ) { }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.pagesService.getSinglePost(route.params.id)
      .pipe(catchError(res => {
        this.notificator.error(res.error.error);
        return of ({page: {}});
      }
    ))
  }
}
