import { Component, OnInit, Input } from '@angular/core';
import Post from 'src/app/models/post';
import { transition, trigger, useAnimation } from '@angular/animations';
import { loadAnimation } from '../../app/animations/loadAnimation';

@Component({
  selector: 'app-post-box',
  animations: [
    trigger('loadingAnimation', [
      transition(':enter', [useAnimation(loadAnimation)]),
    ]),
  ],
  templateUrl: './post-box.component.html',
})
export class PostBoxComponent implements OnInit {
  @Input() post: Post | undefined;
  @Input() highlightedTag: string | undefined;

  ngOnInit(): void { }

  get postLink() {
    if (this.post)
      return `/blog/post/${this.post.link}/`;
    else
      return "";
  }

  get postImage() {
    if (this.post)
      return `/assets/images/${this.post.image}`;
    else
      return "";
  }
}
