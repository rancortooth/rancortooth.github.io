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

    this.postService.getPostDetails(this.router.url.replace('/blog/post/', ''))
      .subscribe((post: Post) => {
        this.title.setTitle(post.title!);
        this.meta.removeTag('name=robots');
        this.meta.addTags([
          { name: 'description', content: post.title! },
          { name: 'robots', content: 'index, follow' },
          { name: 'og:type', content: 'article' },
        ]);
        this.metaService.createCanonicalURL();
        const url = location + "/post.html";
        this.contentService.getContent(url)
          .subscribe(results => this.postHtml = results);
      });
  }

  onResize(event: any) {
    this.appState.checkSize()
  }
}
