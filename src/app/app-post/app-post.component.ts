import { Component, inject } from '@angular/core';
import { PostService } from '../services/post.service';
import { delay, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  providers: [PostService],
  templateUrl: './app-post.component.html',
})
export class AppPostComponent {
  #postService = inject(PostService);
  postUrl: string | undefined;
  postImgUrl: string | undefined;

  constructor(
    // private location: Location
  ) { }

  // tap and delay are a hack until this is resolved: https://github.com/angular/angular/issues/47813
  post$ = inject(ActivatedRoute).params.pipe(
    tap(() => this.postImgUrl = ""),
    switchMap(({ title }) => this.#postService.getPostDetails(title)),
    delay(0),
    tap(({ link, image, title }) => {
      this.postUrl = `/_assets/posts/${link}.md`;
      this.postImgUrl = `/assets/images/${image}`;
      // this.#pageHeadService.setTitle(title);
      // this.#pageHeadService.setOpenGraphTags(title, image, `/blog/post/${link}`);
      // this.#pageHeadService.setTwitterCardData(title, image);
    }
    ),
  );
}