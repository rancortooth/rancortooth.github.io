import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppRoutingModule } from './app-routing.module';
import { AppAboutComponent } from './app-about/app-about.component';
import { AppStarshipflukeComicsComponent } from './app-starshipfluke-comics/app-starshipfluke-comics.component';
import { AppBillymeatComicsComponent } from './app-billymeat-comics/app-billymeat-comics.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    AppHomeComponent,
    AppHeaderComponent,
    AppAboutComponent,
    AppStarshipflukeComicsComponent,
    AppBillymeatComicsComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}

