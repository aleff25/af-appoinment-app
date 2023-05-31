import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoDynamicFormField, PoDynamicFormFieldChanged, PoDynamicFormValidation, PoNotificationService, PoPageAction } from '@po-ui/ng-components';

import { AppointmentCreateService } from '../../services/appointments/appointment-create.service';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-appointment-new',
  templateUrl: './appointment-new.component.html',
  styleUrls: ['./appointment-new.component.css'],
  providers: [AppointmentCreateService]
})
export class AppointmentNewComponent implements OnInit {

  @ViewChild('dynamicForm') form!: NgForm;

  createAppointment = {};
  validateFields: Array<string> = ['state'];

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Appointment', link: '/appointments' }, { label: 'New Appointment'}]
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
      property: 'firstName',
      divider: 'PERSONAL DATA',
      required: true,
      minLength: 4,
      maxLength: 50,
      gridColumns: 6,
      gridSmColumns: 12,
      order: 1,
      placeholder: 'Type your name'
    },
    {
      property: 'lastName',
      required: true,
      minLength: 4,
      maxLength: 50,
      gridColumns: 6,
      gridSmColumns: 12,
      order: 1,
      placeholder: 'Type your last name'
    },
    {
      property: 'nif',
      label: 'NIF',
      type: 'number',
      gridColumns: 6,
      gridSmColumns: 12,
      minLength: 9,
      maxLength: 9,
      optional: true,
    },
    {
      property: 'date',
      label: 'Date',
      type: 'date',
      format: 'mm/dd/yyyy',
      gridColumns: 12,
      gridSmColumns: 12,
      minValue: this.registerService.getCurrentDayString(),
      errorMessage: 'The date must be before the year 2010.',
      order: -1
    },
    {
      property: 'timeStart',
      gridColumns: 6,
      gridSmColumns: 12,
      label: 'Start Time',
      optional: true,
      fieldValue: 'value',
      fieldLabel: 'label',
      options: this.registerService.getAllTimeAvailables(),
    },
    {
      property: 'timeEnd',
      gridColumns: 6,
      gridSmColumns: 12,
      label: 'End Time',
      optional: true,
      fieldValue: 'value',
      fieldLabel: 'label',
      options: this.registerService.getAllTimeAvailables(),
    },
    {
      property: 'workId',
      gridColumns: 6,
      gridSmColumns: 12,
      label: 'Work',
      required: true,
      optionsService: 'http://localhost:9094/works',
      format: ['id', 'description'],
      fieldLabel: 'name',
      fieldValue: 'id',
    },
  ];

  constructor(public poNotification: PoNotificationService,
    private registerService: AppointmentCreateService,
    private location: Location) {}

  ngOnInit() {
    this.createAppointment = {
      name: 'Tony Stark',
      date: '2023-05-29',
    };
  }

  back() {
    this.location.back();
  }

  save() {
    this.createAppointment = {...this.createAppointment, providerId: '278ee5ec-4461-419c-8f5d-f48d436538ea'}

    this.registerService.create(this.createAppointment)
      .subscribe({
        next: () => this.poNotification.success('Appointment created'),
        error: (err) => this.poNotification.error(err.message)
      })

    this.form?.reset();
  }

}
