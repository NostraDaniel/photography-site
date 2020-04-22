import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { IPage } from 'src/app/common/interfaces/page';
import { NotificatorService } from 'src/app/shared/services/notificator.service';
import { PagesService } from 'src/app/core/services/pages.service';

@Component({
  selector: 'app-all-pages',
  templateUrl: './all-pages.component.html',
  styleUrls: ['./all-pages.component.scss']
})
export class AllPagesComponent implements OnInit, OnDestroy {

  private search$: Subscription;
  private routeData$: Subscription;
  private allPages$: Subscription;

  private opened: boolean = true;
  private pages: IPage[] = [];
  private pagesCount: number;
  private filter: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pagesService: PagesService,
    private readonly notificator: NotificatorService
  ) { 
  }

  ngOnInit() {
    this.getAllPages();
  }

  ngOnDestroy() {
    this.search$.unsubscribe();
    this.routeData$.unsubscribe();
    this.allPages$.unsubscribe();
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
    this.routeData$ = this.route.data.subscribe(
      (data) => {
        this.pagesCount = data.pages.pagesCount;
        this.pages = data.pages.pages
      }
    );
  }

  private changePage(event) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;

    this.allPages$ = this.pagesService.getAllPages(pageIndex, pageSize, this.filter).subscribe(
      (pages) => {
        this.pages = pages.pages;
      },
      (error) => {
        this.notificator.error('There was an error while changing the pages!');
      }
    )
  }

  private search(searchStr) {
    this.filter = searchStr;
    
    this.search$ = this.pagesService.getAllPages(1, 12, this.filter).subscribe(
      (pages) => {
        this.pages = pages.pages;
      },
      (error) => {
        this.notificator.error('There was an error while searching!');
      }
    )
  }
}
