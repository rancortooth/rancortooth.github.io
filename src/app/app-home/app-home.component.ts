import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApplicationStateService } from '../application-state.service';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../meta-service.service';
import { Observable } from 'rxjs/internal/Observable';
import Post from '../models/post';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { PostService } from '../services/post.service';
import { tap } from 'rxjs/internal/operators/tap';
import { map } from 'rxjs/internal/operators/map';

export interface Update {
  date: string;
  message: string;
  link: string;
  fragment: string;
  linkMessage: string;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss'],
  providers: [ApplicationStateService]
})
export class AppHomeComponent implements OnInit {

  emailForm = this.formBuilder.group({
    email: ['', Validators.email]
  });

  appState: ApplicationStateService;
  displayedColumns: string[] = ['Message', 'Image'];

  //
  // **** UPDATE INFORMATION ****
  //
  recentComicNum: string = "24"
  recentComicTitle: string = "The Final Frontier"
  //
  // *************************
  //

  emailImage: any;
  emailShown: boolean = true;
  latestComicImage: string = "";

  posts$: Observable<Post[]> | undefined;
  hasMore$ = new BehaviorSubject(true);
  numPostsToLoad$ = new BehaviorSubject(20);
  numPostsDisplayed: number | undefined;
  totalPosts: number | undefined;
  onDestroy$ = new Subject();


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private applicationState: ApplicationStateService,
    private meta: Meta,
    private title: Title,
    private metaService: MetaService,
    private postService: PostService
  ) {
    this.appState = this.applicationState;
    this.emailImage = "assets/email-signup-1.png"
    this.emailShown = true
    this.latestComicImage = "assets/starshipfluke-comics/thumbnail" + this.recentComicNum + ".png"
  }
  ngOnInit(): void {
    this.title.setTitle("Starship Fluke - cloud DevOps and development blogs")
    this.meta.addTags([
      { name: 'description', content: 'DevOps blogs including AWS, linux, cloud and more!' },
      { name: 'robots', content: 'index,follow' },
      { name: 'og:type', content: 'article' },
    ]);
    this.metaService.createCanonicalURL();

    this.numPostsToLoad$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((numPostsToLoad) => {
        this.posts$ = this.postService.getLatestPosts().pipe(
          tap((posts) => {
            this.totalPosts = posts.length;
            if (numPostsToLoad < this.totalPosts) {
              this.hasMore$.next(true);
            } else {
              this.hasMore$.next(false);
            }
          }),
          map((posts) => posts.slice(0, numPostsToLoad)),
          tap((_) => (this.numPostsDisplayed = numPostsToLoad))
        );
      });

  }

  get email() {
    return this.emailForm.get('email')
  }

  onSubmit(): void {
    console.warn('YOUR EMAIL', this.emailForm.value);
    this.http.post('https://formspree.io/f/mvoykjop', this.emailForm.value).subscribe(data => {
      console.warn(data)
      this.emailForm.reset();
      this.emailImage = "assets/email-signup-2.png"
      this.emailShown = false
    })
  }

  onResize(event: any) {
    this.appState.checkSize()
  }

}
