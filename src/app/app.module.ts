import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppRoutingModule } from './app-routing.module';
import { AppAboutComponent } from './app-about/app-about.component';
import { AppStarshipflukeComicsComponent } from './app-starshipfluke-comics/app-starshipfluke-comics.component';
import { AppBillymeatComicsComponent } from './app-billymeat-comics/app-billymeat-comics.component';
import { SFImageService } from './sfimage.service';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table'
import { MatMenuModule } from '@angular/material/menu';
import { BlogDrawingTabletsComponent } from './blog-drawing-tablets/blog-drawing-tablets.component';
import { BlogCreativeMindsetComponent } from './blog-creative-mindset/blog-creative-mindset.component';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { BMImageService } from './bmimage.service';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatMenuModule,
    NgxGoogleAnalyticsModule.forRoot('G-F6GT7CXJ8Q')
  ],
  declarations: [
    AppComponent,
    AppHomeComponent,
    AppHeaderComponent,
    AppAboutComponent,
    AppStarshipflukeComicsComponent,
    AppBillymeatComicsComponent,
    BlogDrawingTabletsComponent,
    BlogCreativeMindsetComponent,
  ],
  providers: [
    SFImageService,
    BMImageService,
    Title
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}

