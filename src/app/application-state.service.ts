import {Injectable} from '@angular/core';

@Injectable()
export class ApplicationStateService {

  private isMobileResolution: boolean;

  constructor() {
    this.isMobileResolution = false;
    this.checkSize()
  }

  public checkSize() {
    if (typeof window != "undefined") {
      if (window.innerWidth < 768) {
        this.isMobileResolution = true;
      } else {
        this.isMobileResolution = false;
      }
    }
  }

  public getIsMobileResolution(): boolean {
    return this.isMobileResolution;
  }
}