import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { ApplicationStateService } from '../application-state.service';
import { MetaService } from '../meta-service.service';
import { BMImageService } from '../bmimage.service';    

@Component({
  selector: 'app-app-billymeat-comics',
  templateUrl: './app-billymeat-comics.component.html',
  styleUrls: ['./app-billymeat-comics.component.scss'],
  providers: [ApplicationStateService]
})
export class AppBillymeatComicsComponent implements OnInit, OnChanges, AfterViewInit {
  [x: string]: any;
  episode: number = 1
  image: any
  images:any[] | undefined;    
  filterBy?: string = 'all'    
  allImages:any[] = [];
  appState: ApplicationStateService;
  nextComicButtonHidden: boolean = false;
  prevComicButtonHidden: boolean = true;
  
  @ViewChild('scrollwrap', {static:false}) scrolldiv!: ElementRef;
  @ViewChild('scrollcomicbar', {static:false}) scrollcomicbar!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imageService: BMImageService,
    private applicationState: ApplicationStateService,
    private meta: Meta,
    private title:Title,
    private metaService: MetaService
    ) {
    this.allImages = this.imageService.getImages();
    this.appState = this.applicationState;
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      this.scrolldiv.nativeElement.scrollTop = 0
    });
  }

  ngOnInit(): void {
    this.title.setTitle("Billy Meat - Web Comics")
    this.meta.removeTag('name=robots'); 
    this.meta.addTags([
      { name: 'description', content: 'WARNING: This material contains low-brow, toilet humor. It’s best to turn back now. Six out of five surgeon generals agree that reading this is detrimental to your health. There is also a fifty brain cell cover charge.' },
      { name: 'robots', content: 'index'} ,
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@wjtorlander' },
    ]);
    this.metaService.createCanonicalURL();
      this.route.params.subscribe(
        params => {
          this.episode = +params['episode'];
          this.image = this.imageService.getImage(this.episode)
        }
    );
    this.showHideComicNavButtons()
  }

  ngOnChanges() {    
    this.allImages = this.imageService.getImages();    
  }

  onResize(event: any) {
    this.appState.checkSize()
  }

  showHideComicNavButtons() {
    if (this.episode <= 1) {
      this.prevComicButtonHidden = false
      this.nextComicButtonHidden = true
      this.episode = 1
    } else if (this.episode >= this.imageService.getImageCount()) {
      this.prevComicButtonHidden = true
      this.nextComicButtonHidden = false
      this.episode = this.imageService.getImageCount()
    } else {
      this.prevComicButtonHidden = true
      this.nextComicButtonHidden = true
    }
  }

  onSelectComic(imageId: number) {
    this.episode = imageId
    this.showHideComicNavButtons()
  }

  onNextComic() {
    this.episode = this.episode + 1
    this.showHideComicNavButtons()
    this.router.navigateByUrl('/billymeat/' + this.episode)
    this.scrollcomicbar.nativeElement.scrollTo((this.episode - 4) * 70, 0)
  }

  onPrevComic() {
    this.episode = this.episode - 1
    this.showHideComicNavButtons()
    this.router.navigateByUrl('/billymeat/' + this.episode)
    this.scrollcomicbar.nativeElement.scrollTo((this.episode - 4) * 70, 0)
  }
}
