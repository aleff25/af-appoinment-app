import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PoPageDynamicDetailModule } from '@po-ui/ng-templates';

import { WorkNewComponent } from './work-new.component';

describe('WorkNewComponent', () => {
  let component: WorkNewComponent;
  let fixture: ComponentFixture<WorkNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PoPageDynamicDetailModule
      ],
      declarations: [ WorkNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
