import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllPagesComponent } from './all-pages/all-pages.component';
import { PagesResolverService } from './services/pages-resolver.service';
import { CreatePageComponent } from './create-page/create-page.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: AllPagesComponent, pathMatch: 'full', resolve: {pages: PagesResolverService }, canActivate: [AuthGuard] },
  { path: 'create-page', component: CreatePageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageCreatorRoutingModule { }

