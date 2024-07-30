import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxNewActivityComponent } from './box-new-activity.component';

describe('BoxNewActivityComponent', () => {
  let component: BoxNewActivityComponent;
  let fixture: ComponentFixture<BoxNewActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxNewActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxNewActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
