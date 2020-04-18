import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCard2Component } from './page-card2.component';

describe('PageCard2Component', () => {
  let component: PageCard2Component;
  let fixture: ComponentFixture<PageCard2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCard2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
