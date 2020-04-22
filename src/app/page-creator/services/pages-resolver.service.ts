import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PagesService } from 'src/app/core/services/pages.service';
import { NotificatorService } from 'src/app/shared/services/notificator.service';

@Injectable()
export class PagesResolverService implements Resolve<{pages: any[]}> {

  constructor(
    private readonly pagesService: PagesService,
    ) { }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    console.log('tuk');
    return this.pagesService.getAllPages()
      .pipe(

        catchError(
        res => {
          // todo: add notification if error
          // Alternativle, if the res.error.code === 401, you can logout the user and redirect to /home
          return of({pages: []});
        }
      ),);
  }
}
