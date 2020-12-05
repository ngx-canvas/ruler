import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulerAxisComponent } from './axis.component';

describe('RulerAxisComponent', () => {
  let component: RulerAxisComponent;
  let fixture: ComponentFixture<RulerAxisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulerAxisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulerAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
