import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPage } from 'src/app/common/interfaces/page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-card',
  templateUrl: './page-card.component.html',
  styleUrls: ['./page-card.component.scss']
})
export class PageCardComponent implements OnInit {

  @Input() showOptions: boolean = true;
  @Input() page: IPage;
  @Output() deleteCardEvent = new EventEmitter();

  constructor(
    private readonly router: Router,
  ) { }

  ngOnInit() {}

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

