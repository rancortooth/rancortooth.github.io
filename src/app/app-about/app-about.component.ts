import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  ) { }

  ngOnInit(): void {
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
