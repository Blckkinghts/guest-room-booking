import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminverifyComponent } from './adminverify.component';

describe('AdminverifyComponent', () => {
  let component: AdminverifyComponent;
  let fixture: ComponentFixture<AdminverifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminverifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
