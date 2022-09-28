import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BMImageService {
  NUM_COMICS=12;
  allImages: any[] = [];
  imageDetails: any[] = [];

  constructor() {
      for (let i = 1; i <= this.NUM_COMICS; i++) {
          let num = i.toString().padStart(2, '0');
          this.imageDetails.push({"id": num, "thumbnail": "assets/billymeat-comics/thumbnail" + num + ".png", "url": "assets/billymeat-comics/ep" + num + ".png"});
      }
  }
  
  getImages() {
      return this.allImages = this.imageDetails.slice(0);
  }
  
  getImage(id: number) {
      return this.imageDetails.slice(0).find(Images => Images.id == id)
  }

  getImageCount() {
      return this.imageDetails.length
  }
}    
