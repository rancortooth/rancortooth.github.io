import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-creative-mindset',
  templateUrl: './blog-creative-mindset.component.html',
  styleUrls: ['./blog-creative-mindset.component.scss']
})
export class BlogCreativeMindsetComponent implements OnInit {

  constructor(
    private meta: Meta,
    private title:Title
  ) { 
    this.title.setTitle("Starship Fluke Blog - Creative Mindset")
    this.meta.addTags([
      { name: 'description', content: 'Blog on how to get into a creative mindset and setup your environment to foster creativity' },
      { name: 'robots', content: 'index,follow'} ,
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@wjtorlander' },
    ]);
  }

  ngOnInit(): void {
  }

}
