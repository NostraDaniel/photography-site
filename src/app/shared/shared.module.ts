import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {TextFieldModule} from '@angular/cdk/text-field';
import {
  MatToolbarModule,
  MatToolbar,
  MatButtonModule,
  MatButton,
  MatIconModule,
  MatIcon,
  MatSidenavModule,
  MatSidenav,
  MatSidenavContent,
  MatSidenavContainer,
  MatFormFieldModule,
  MatFormField,
  MatInputModule,
  MatInput,
  MatNavList,
  MatListModule,
  MatCardModule,
  MatCard,
  MatCardTitle,
  MatCardHeader,
  MatCardSubtitle,
  MatCardContent,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatChipsModule,
  MatTabsModule,
  MatTooltipModule,
  MatSliderModule,
  MatGridListModule,
  MatSortModule,
  MatDialogModule,
  MatSlideToggleModule
} from '@angular/material';
import { LightboxModule } from 'ngx-lightbox';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { MasonryGalleryModule } from 'ngx-masonry-gallery';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DragAndDropComponent } from '../components/drag-and-drop/drag-and-drop.component';
import { DragDropDirective } from '../common/directives/drag-and-drop.directive';
import { NgxMasonryModule } from 'ngx-masonry';
import { PageOptionsComponent } from '../page-creator/page-options/page-options.component';
import { PageCardComponent } from '../page-creator/page-card/page-card.component';

@NgModule({
  declarations: [
    DragAndDropComponent,
    DragDropDirective,
    PageOptionsComponent,
    PageCardComponent,
  ],
  imports: [
    NgxMasonryModule,
    MasonryGalleryModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    PerfectScrollbarModule,
    // TextFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSliderModule,
    MatGridListModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
    NgxSpinnerModule,
    MDBBootstrapModule,
    MatSlideToggleModule,
    LightboxModule,
  ],

  exports: [
    NgxMasonryModule,
    LightboxModule,
    MasonryGalleryModule,
    MatToolbar,
    PerfectScrollbarModule,
    MatButton,
    MatIcon,
    MatCardModule,
    MatSidenav,
    MatSidenavContent,
    MatSidenavContainer,
    MatFormField,
    MatFormFieldModule,
    MatInput,
    MatNavList,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardSubtitle,
    MatCardContent,
    CommonModule,
    MatMenuModule,
    // TextFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatButtonModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSliderModule,
    MatInputModule,
    FormsModule,
    MatGridListModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
    NgxSpinnerModule,
    MDBBootstrapModule,
    MatSlideToggleModule,
    DragAndDropComponent,
    DragDropDirective,
    MatSidenavModule,
    PageOptionsComponent,
    PageCardComponent
  ]
})
export class SharedModule {}