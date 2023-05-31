import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoDynamicFormField, PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { Location } from '@angular/common';

import { NgForm } from '@angular/forms';
import { CreateWorkService } from '../../services/works/create-work.service';

@Component({
  selector: 'app-work-new',
  templateUrl: './work-new.component.html',
  styleUrls: ['./work-new.component.css'],
  providers: [CreateWorkService]
})
export class WorkNewComponent implements OnInit {

  @ViewChild('dynamicForm') form!: NgForm;

  createWork = {};
  validateFields: Array<string> = ['state'];

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Work', link: '/works' }, { label: 'New Work'}]
  };

  readonly actions: Array<PoPageAction> = [
    {
      label: 'Save',
      action: this.save.bind(this)
    },
    {
      label: 'Back',
      action: this.back.bind(this)
    },
  ];

  fields: Array<PoDynamicFormField> = [
    {
      property: 'name',
      divider: 'WORK DATA',
      required: true,
      minLength: 4,
      maxLength: 50,
      gridColumns: 6,
      gridSmColumns: 12,
      order: 1,
      placeholder: 'Type service name'
    },
    {
      property: 'description',
      required: true,
      minLength: 4,
      maxLength: 50,
      gridColumns: 6,
      gridSmColumns: 12,
      order: 1,
      placeholder: 'Type the description of the service'
    },
    {
      property: 'price',
      label: 'Price',
      type: 'number',
      gridColumns: 6,
      gridSmColumns: 12,
      required: true,
    },
    {
      property: 'duration',
      label: 'Duration (m)',
      type: 'number',
      gridColumns: 6,
      gridSmColumns: 12,
      minLength: 1,
      maxLength: 3,
      required: true,
    },
    {
      property: 'targetCustomer',
      gridColumns: 6,
      gridSmColumns: 12,
      label: 'Type of Customer',
      optional: true,
      fieldValue: 'value',
      fieldLabel: 'label',
      options: [
        {
          label: 'Retail',
          value: 'retail'
        },
        {
          label: 'Corporate',
          value: 'corporate'
        }
      ],
    },
  ];

  constructor(
    public poNotification: PoNotificationService,
    private createWorkService: CreateWorkService,
    private location: Location) {}

  ngOnInit() {}

  back() {
    this.location.back();
  }

  save() {
    this.createWork = {...this.createWork, providerId: '278ee5ec-4461-419c-8f5d-f48d436538ea'}

    this.createWorkService.create(this.createWork)
      .subscribe({
        next: () => this.poNotification.success('Appointment created'),
        error: (err) => this.poNotification.error(err.message)
      });

    this.form?.reset();

  }

}
