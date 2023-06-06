import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { ApplicationStateService } from '../application-state.service';
import { MetaService } from '../meta-service.service';
import { PostService } from '../services/post.service';
import { ContentService } from '../services/content.service';
import Post from '../models/post.js';
import { delay, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './app-post.component.html',
  styleUrls: ['./app-post.component.scss'],
  providers: [ApplicationStateService, PostService]
})
export class AppPostComponent implements OnInit, AfterViewInit {
  filterBy?: string = 'all'
  postDetails: Post | undefined;
  appState: ApplicationStateService;
  postFilename: string = "";
  postHtml: any;

  #postService = inject(PostService);
  postImgUrl: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private applicationState: ApplicationStateService,
    private meta: Meta,
    private title: Title,
    private metaService: MetaService,
    private contentService: ContentService
  ) {
    // this.postDetails = this.postService.getPostDetails();
    this.appState = this.applicationState;
  }

  // tap and delay are a hack until this is resolved: https://github.com/angular/angular/issues/47813
  post$ = inject(ActivatedRoute).params.pipe(
    tap(() => this.postImgUrl = ""),
    switchMap(({ title }) => this.#postService.getPostDetails(title)),
    delay(0),
    tap(({ link, image, title }) => {
      this.postImgUrl = `/assets/images/${image}`;
    }
    ),
  );

  ngAfterViewInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }

  ngOnInit(): void {
    this.title.setTitle("Blog Post")
    this.meta.removeTag('name=robots');
    this.meta.addTags([
      { name: 'description', content: 'Blog Post' },
      { name: 'robots', content: 'index' },
    ]);
    this.metaService.createCanonicalURL();

    // Ex: 'http://localhost:4200/blog/post/2023-06-04-angular-prerender-unhandled-exception/post.html';
    const url = location + "/post.html";
    this.contentService.getContent(url)
      .subscribe(response => {
        this.postHtml = response;
      });

    this.route.params.subscribe(
      params => {
        this.postService.getPostDetails(params['title']).subscribe(
          postDetails => {
            // this.postFilename = postDetails.filename;
            this.postFilename = "/assets/blog/post/2023-06-04-angular-prerender-unhandled-exception/post.html";
            // this.getData(this.postFilename);
          }
        );
      }
    );
  }
  // public getData(path: string) {
  //   var url = "http://localhost:4200" + path;
  //   this.httpClient.get<any[]>(url)
  //     .subscribe(data => {
  //       this.postHtml = data;
  //     },
  //       error => {
  //       }
  //     );
  // }

  // public getContent(path: string): string {
  //   return this.contentService.get(path);
  // }

  // public getContent(path: string) {
  //   this.contentService.get(path).subscribe(
  //     html => {
  //       this.postHtml = html;
  //     }
  //   );
  // }

  onResize(event: any) {
    this.appState.checkSize()
  }
}
