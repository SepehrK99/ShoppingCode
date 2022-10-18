import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlectorComponent } from './slector.component';

describe('SlectorComponent', () => {
  let component: SlectorComponent;
  let fixture: ComponentFixture<SlectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
