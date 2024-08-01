import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewBoxComponent } from './user-view-box.component';

describe('UserViewBoxComponent', () => {
  let component: UserViewBoxComponent;
  let fixture: ComponentFixture<UserViewBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserViewBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserViewBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
