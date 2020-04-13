import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IPage } from 'src/app/common/interfaces/page';
import { EditPageDialogComponent } from '../edit-page-dialog/edit-page-dialog.component';

@Component({
  selector: 'app-page-options',
  templateUrl: './page-options.component.html',
  styleUrls: ['./page-options.component.scss']
})
export class PageOptionsComponent {

  @Input() page: IPage;
  @Output() public deleteOptionEvent: EventEmitter<any> = new EventEmitter();
  @Output() public editPageEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MatDialog
    ) { }

  editPage(page: IPage): void {
    const dialogRef = this.dialog.open(EditPageDialogComponent, {
      width: '600px',
      height: '780px',
      data: this.page
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) {
        return;
      }

      this.editPageEvent.emit(result);
    });
  }

  delete(id: string) {
    this.deleteOptionEvent.emit(id);
  }
}
