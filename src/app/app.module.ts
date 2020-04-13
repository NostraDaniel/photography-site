import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SliderComponent } from './components/slider/slider.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';
import { WorkComponent } from './components/work/work.component';
import { HeaderComponent } from './components/header/header.component';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptor } from './common/interceptors/auth.interceptor';
import { ServerErrorInterceptor } from './common/interceptors/server-error.interceptor';
import { SpinnerInterceptor } from './common/interceptors/spinner.interceptor';
import { LoginComponent } from './components/login/login.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SliderComponent,
    WorkComponent,
    LoginComponent,
    ServerErrorComponent,
    NotFoundComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
