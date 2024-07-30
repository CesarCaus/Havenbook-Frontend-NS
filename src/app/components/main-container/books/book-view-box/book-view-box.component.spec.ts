import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookViewBoxComponent } from './book-view-box.component';

describe('BookViewBoxComponent', () => {
  let component: BookViewBoxComponent;
  let fixture: ComponentFixture<BookViewBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookViewBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookViewBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
