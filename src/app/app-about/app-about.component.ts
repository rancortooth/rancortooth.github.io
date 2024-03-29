import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';
import { MetaService } from '../meta-service.service';

@Component({
  selector: 'app-app-about',
  templateUrl: './app-about.component.html',
  styleUrls: ['./app-about.component.scss']
})
export class AppAboutComponent implements OnInit {
  messageForm = this.formBuilder.group({
    message: ['']
  });
  messageShown: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private meta: Meta,
    private title:Title,
    private metaService: MetaService
  ) {
   }

  ngOnInit(): void {
    this.title.setTitle("Starship Fluke About Site and Author")
    this.meta.addTags([
      { name: 'description', content: 'About Starship Fluke and contact information' },
      { name: 'robots', content: 'index,follow'} ,
    ], true);
    this.metaService.createCanonicalURL();
  }

  onSubmit(): void {
    console.warn('MESSAGE', this.messageForm.value);
    this.http.post('https://formspree.io/f/mvoyarga', this.messageForm.value).subscribe(data => {
          console.warn(data)
          this.messageForm.reset();
          this.messageShown = false
          })
  }

}
