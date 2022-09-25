import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCreativeMindsetComponent } from './blog-creative-mindset.component';

describe('BlogCreativeMindsetComponent', () => {
  let component: BlogCreativeMindsetComponent;
  let fixture: ComponentFixture<BlogCreativeMindsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogCreativeMindsetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogCreativeMindsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
