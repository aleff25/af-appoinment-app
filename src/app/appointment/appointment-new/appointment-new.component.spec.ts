import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PoPageDynamicDetailModule } from '@po-ui/ng-templates';

import { AppointmentNewComponent } from './appointment-new.component';

describe('AppointmentNewComponent', () => {
  let component: AppointmentNewComponent;
  let fixture: ComponentFixture<AppointmentNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PoPageDynamicDetailModule
      ],
      declarations: [ AppointmentNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
