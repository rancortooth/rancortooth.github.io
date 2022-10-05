import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAboutComponent } from './app-about/app-about.component';
import { AppBillymeatComicsComponent } from './app-billymeat-comics/app-billymeat-comics.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppStarshipflukeComicsComponent } from './app-starshipfluke-comics/app-starshipfluke-comics.component';
import { BlogCreativeMindsetComponent } from './blog-creative-mindset/blog-creative-mindset.component';
import { BlogDrawingTabletsComponent } from './blog-drawing-tablets/blog-drawing-tablets.component';

const routes: Routes = [
  { path: '', component: AppHomeComponent },
  { path: 'about', component: AppAboutComponent },
  { path: 'blog/drawingtablets', component: BlogDrawingTabletsComponent },
  { path: 'blog/creativemindset', component: BlogCreativeMindsetComponent },
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
export class AppRoutingModule {}
