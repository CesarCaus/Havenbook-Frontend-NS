import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxEditActivityComponent } from './box-edit-activity.component';

describe('BoxEditActivityComponent', () => {
  let component: BoxEditActivityComponent;
  let fixture: ComponentFixture<BoxEditActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxEditActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxEditActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
