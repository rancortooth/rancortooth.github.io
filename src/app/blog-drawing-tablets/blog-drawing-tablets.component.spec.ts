import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDrawingTabletsComponent } from './blog-drawing-tablets.component';

describe('BlogDrawingTabletsComponent', () => {
  let component: BlogDrawingTabletsComponent;
  let fixture: ComponentFixture<BlogDrawingTabletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogDrawingTabletsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogDrawingTabletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
