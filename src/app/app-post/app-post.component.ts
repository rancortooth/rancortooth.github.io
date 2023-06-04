import { Component, inject } from '@angular/core';
import { PostService } from '../services/post.service';
import { delay, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  providers: [PostService],
  templateUrl: './app-post.component.html',
})
export class AppPostComponent {
  #postService = inject(PostService);
  // postUrl: string | undefined;
  postImgUrl: string | undefined;
  md: string | undefined;

  constructor(private http: HttpClient) { }

  // tap and delay are a hack until this is resolved: https://github.com/angular/angular/issues/47813
  post$ = inject(ActivatedRoute).params.pipe(
    tap(() => this.postImgUrl = ""),
    switchMap(({ title }) => this.#postService.getPostDetails(title)),
    delay(0),
    tap(({ link, image, title }) => {
      this.http.get('/_assets/posts/' + link + '.md', { responseType: 'text' }).subscribe(data => {
        this.md = data;
      });
      this.postImgUrl = `/assets/images/${image}`;
    }
    ),
  );
}