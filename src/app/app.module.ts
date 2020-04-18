import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component';
import { SliderComponent } from './components/slider/slider.component';
import { WorkComponent } from './components/work/work.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
