import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApplicationStateService } from '../application-state.service';

export interface Update {
  date: string;
  message: string;
  link: string;
  linkMessage: string;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss'],
  providers: [ApplicationStateService]
})
export class AppHomeComponent {

  emailForm = this.formBuilder.group({
    email: ['', Validators.email]
 }); 

  appState: ApplicationStateService;
  displayedColumns: string[] = ['Message', 'Image'];

  //
  // **** UPDATE INFORMATION ****
  //
  recentComicNum: string = "20"
  recentComicTitle: string = "Evolution"
  updates: Update[] = [
    {"date": "9/25/2022", "message": "This website is now in alpha testing!", "link": "/about", "linkMessage": "About Page", "image": "assets/insignia.jpg"},
    {"date": "9/24/2022", "message": "Getting excited to launch soon! Boo-yah!", "link": "", "linkMessage": "", "image": "assets/kuku_icon.png"},
  ]
  //
  // *************************
  //

  emailImage: any;
  emailShown: boolean = true;
  latestComicImage: string= "";
  
  constructor (
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private applicationState: ApplicationStateService
  ) { 
    this.appState = this.applicationState;
    this.emailImage = "assets/email-signup-1.png"
    this.emailShown = true
    this.latestComicImage = "assets/starshipfluke-comics/thumbnail" + this.recentComicNum + ".png"
  }

  get email(){
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
