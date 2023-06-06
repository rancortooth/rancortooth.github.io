import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAboutComponent } from './app-about/app-about.component';
import { AppBillymeatComicsComponent } from './app-billymeat-comics/app-billymeat-comics.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppStarshipflukeComicsComponent } from './app-starshipfluke-comics/app-starshipfluke-comics.component';
import { AppPostComponent } from './app-post/app-post.component';

const routes: Routes = [
  { path: '', component: AppHomeComponent },
  { path: 'about', component: AppAboutComponent },
  { path: 'blog/post/:title', component: AppPostComponent },
  { path: 'starshipfluke/:episode', component: AppStarshipflukeComicsComponent },
  { path: 'billymeat/:episode', component: AppBillymeatComicsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
