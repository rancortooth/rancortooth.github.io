import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAboutComponent } from './app-about/app-about.component';
import { AppBillymeatComicsComponent } from './app-billymeat-comics/app-billymeat-comics.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppStarshipflukeComicsComponent } from './app-starshipfluke-comics/app-starshipfluke-comics.component';

const routes: Routes = [
  { path: '', component: AppHomeComponent },
  { path: 'about', component: AppAboutComponent },
  { path: 'starshipfluke', component: AppStarshipflukeComicsComponent },
  { path: 'billymeat', component: AppBillymeatComicsComponent },
  { path: '**', redirectTo: '' }
  ];
  
@NgModule({
  imports: [ 
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
