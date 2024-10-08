import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MFAComponent } from './MFA.component';

describe('UnblockAccountComponent', () => {
  let component: MFAComponent;
  let fixture: ComponentFixture<MFAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MFAComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MFAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
