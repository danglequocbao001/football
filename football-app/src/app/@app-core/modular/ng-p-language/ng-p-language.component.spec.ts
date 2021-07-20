import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPLanguageComponent } from './ng-p-language.component';

describe('NgPLanguageComponent', () => {
  let component: NgPLanguageComponent;
  let fixture: ComponentFixture<NgPLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgPLanguageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgPLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
