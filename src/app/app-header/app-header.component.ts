import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationStateService } from '../application-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  providers: [ApplicationStateService]
})
export class AppHeaderComponent implements OnInit {
  appState: ApplicationStateService;
  menuToggle: boolean = false;
  
  constructor(
    private applicationState: ApplicationStateService,
    public router: Router
  ) { 
    this.appState = this.applicationState;
  }

  ngOnInit(): void {
  }

  onResize(event: any) {
    this.appState.checkSize()
  }

  closeMenu() {
    this.menuToggle = false;
  }
  
  onClickComics(selection: any) {
    this.router.navigate([selection]);
  }
}
