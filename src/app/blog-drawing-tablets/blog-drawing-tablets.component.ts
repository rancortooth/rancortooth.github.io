import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-drawing-tablets',
  templateUrl: './blog-drawing-tablets.component.html',
  styleUrls: ['./blog-drawing-tablets.component.scss']
})
export class BlogDrawingTabletsComponent implements OnInit {

  constructor(
    private meta: Meta,
    private title:Title
  ) {
    this.title.setTitle("Starship Fluke Blog - Drawing Tablets With or Without Screens")
    this.meta.addTags([
      { name: 'description', content: 'Blog on experiences using drawing tablets with or without screens' },
      { name: 'robots', content: 'index,follow'} ,
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@wjtorlander' },
    ]);
   }

  ngOnInit(): void {
  }

}
