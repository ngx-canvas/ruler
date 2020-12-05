import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulerContentComponent } from './content.component';

describe('RulerContentComponent', () => {
  let component: RulerContentComponent;
  let fixture: ComponentFixture<RulerContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulerContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
