import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamberTempDisplayComponent } from './chamber-temp-display.component';

describe('ChamberTempDisplayComponent', () => {
  let component: ChamberTempDisplayComponent;
  let fixture: ComponentFixture<ChamberTempDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamberTempDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamberTempDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
