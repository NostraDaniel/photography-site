import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { IPage } from 'src/app/common/interfaces/page';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { NotificatorService } from 'src/app/core/services/notificator.service';
import { AuthService } from 'src/app/core/services/auth.services';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from 'src/app/core/services/pages.service';

@Component({
  selector: 'app-all-pages',
  templateUrl: './all-pages.component.html',
  styleUrls: ['./all-pages.component.scss']
})
export class AllPagesComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private isLogged: boolean = false;

  public pages: IPage[] = [];
  public pagesCount: number;
  public filter: string = '';
  public pageEvent: PageEvent;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pagesService: PagesService,
    private readonly notificator: NotificatorService,
    private readonly auth: AuthService,
  ) { 
  }

  ngOnInit() {
    this.getAllPages();
    
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

  delete(id: string): void {
    this.pagesService.delete(id).subscribe(
      (data) => {
        const indexDeleted = this.pages.findIndex(page => id === page.id);

        this.pages.splice(indexDeleted, 1);
        this.notificator.success('Page was successfully deleted!');
      },
      (err) => {
        this.notificator.error('There was an error while deleting the page!');
      }
    );
  }

  private getAllPages() {
    this.route.data.subscribe(
      (data) => {
        console.log(data)
        this.pagesCount = data.pages.pagesCount;
        this.pages = data.posts.posts
      }
    );
  }

  changePage(event) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;

    this.pagesService.getAllPages(pageIndex, pageSize, this.filter).subscribe(
      (pages) => {
        this.pages = pages.pages;
      },
      (error) => {
        this.notificator.error('There was an error while changing the pages!');
      }
    )
  }

  search(searchStr) {
    this.filter = searchStr;
    
    this.pagesService.getAllPages(1, 12, this.filter).subscribe(
      (pages) => {
        this.pages = pages.pages;
      },
      (error) => {
        this.notificator.error('There was an error while searching!');
      }
    )
  }
}
