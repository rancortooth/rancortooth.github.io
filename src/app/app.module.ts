import { NgModule, SecurityContext } from '@angular/core';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table'
import { MatMenuModule } from '@angular/material/menu';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { BMImageService } from './bmimage.service';
import { AppPostComponent } from './app-post/app-post.component'
import { MarkdownModule, MarkdownService, MarkedOptions } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostBoxComponent } from './components/post-box/post-box.component';

@NgModule({
    declarations: [
        AppComponent,
        AppHomeComponent,
        AppHeaderComponent,
        AppAboutComponent,
        AppStarshipflukeComicsComponent,
        AppBillymeatComicsComponent,
        AppPostComponent,
        PostBoxComponent,
    ],
    providers: [
        SFImageService,
        BMImageService,
        Title,
        MarkdownService
    ],
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        CommonModule,
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatMenuModule,
        NgxGoogleAnalyticsModule.forRoot('G-F6GT7CXJ8Q'),
        MarkdownModule.forRoot({
            sanitize: SecurityContext.NONE
        }),
        RouterModule
    ]
})
export class AppModule {
}

