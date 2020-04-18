import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCreatorRoutingModule } from './page-creator-routing.module';
import { AllPagesComponent } from './all-pages/all-pages.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { PagesResolverService } from './services/pages-resolver.service';
import { SharedModule } from '../shared/shared.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SinglePageComponent } from './single-page/single-page.component';
import { LightboxModule } from 'ngx-lightbox';
import { EditPageDialogComponent } from './edit-page-dialog/edit-page-dialog.component';
import { MasonryGalleryModule } from 'ngx-masonry-gallery';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerErrorInterceptor } from '../common/interceptors/server-error.interceptor';
import { AuthTokenInterceptor } from '../auth/auth.interceptor';
import { SpinnerInterceptor } from '../common/interceptors/spinner.interceptor';
import { PageCardComponent } from './page-card/page-card.component';
import { TestComponent } from './test/test.component';
import { PageCard2Component } from './page-card2/page-card2.component';
import { PageOptionsComponent } from './page-options/page-options.component';

@NgModule({
  declarations: [
    EditPageDialogComponent,
    AllPagesComponent, 
    CreatePageComponent, 
    SinglePageComponent, 
    TestComponent, 
    PageCard2Component,
    PageOptionsComponent
  ],
  imports: [
    CommonModule,
    PageCreatorRoutingModule,
    SharedModule,
    CKEditorModule,
    LightboxModule,
    MasonryGalleryModule
  ],
  entryComponents: [
    EditPageDialogComponent
  ],
  providers: [
    PagesResolverService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
  ]
})
export class PageCreatorModule { }
