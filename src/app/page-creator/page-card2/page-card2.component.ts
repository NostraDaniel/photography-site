import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IPage } from 'src/app/common/interfaces/page';

@Component({
  selector: 'app-page-card2',
  templateUrl: './page-card2.component.html',
  styleUrls: ['./page-card2.component.scss']
})
export class PageCard2Component implements OnInit {
  @Input() showOptions: boolean = true;
  @Input() page: IPage;
  @Output() deleteCardEvent = new EventEmitter();

  constructor(
    private readonly router: Router,
  ) { }

  ngOnInit() {
  }

  showPage(id: string): void {
    this.router.navigate([`/blog/post/${id}`]);
  }

  delete(id: string): void {
    this.deleteCardEvent.emit(id);
  }

  editPage(editedPage): void {
    this.page = editedPage;
  }
}
