import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { ApplicationStateService } from '../application-state.service';
import { SFImageService } from '../sfimage.service';    

@Component({
  selector: 'app-app-starshipfluke-comics',
  templateUrl: './app-starshipfluke-comics.component.html',
  styleUrls: ['./app-starshipfluke-comics.component.scss'],
  providers: [ApplicationStateService]
})
export class AppStarshipflukeComicsComponent implements OnInit, OnChanges, AfterViewInit {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imageService: SFImageService,
    private applicationState: ApplicationStateService,
    private meta: Meta,
    private title:Title
    ) {
    this.allImages = this.imageService.getImages();
    this.appState = this.applicationState;
    this.title.setTitle("Starship Fluke - Web Comics")
    this.meta.addTags([
      { name: 'description', content: 'Come explore web comics featuring the zany crew of the Starship Fluke! Features comics and blogs by wjtorlander full of sci-fi and comedy fun' },
      { name: 'robots', content: 'index,follow'} ,
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@wjtorlander' },
    ]);

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
    this.router.navigateByUrl('/starshipfluke/' + this.episode)
  }

  onPrevComic() {
    this.episode = this.episode - 1
    this.showHideComicNavButtons()
    this.router.navigateByUrl('/starshipfluke/' + this.episode)
  }
}
