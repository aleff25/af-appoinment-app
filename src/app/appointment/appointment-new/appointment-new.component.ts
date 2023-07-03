import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoDynamicFormField, PoDynamicFormFieldChanged, PoDynamicFormValidation, PoNotificationService, PoPageAction } from '@po-ui/ng-components';

import { AppointmentCreateService } from '../../services/appointments/appointment-create.service';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { parseISO, getHours, getMinutes } from 'date-fns'
import { CustomersListService } from '../../services/customers/customers-list.service';
import { ICustomerList } from '../../core/entities/customer/customer.interface';

@Component({
  selector: 'app-appointment-new',
  templateUrl: './appointment-new.component.html',
  styleUrls: ['./appointment-new.component.css'],
  providers: [
    AppointmentCreateService,
    CustomersListService
  ]
})
export class AppointmentNewComponent implements OnInit {

  @ViewChild('dynamicForm') form!: NgForm;

  createAppointment = {};
  validateFields: Array<string> = ['newClient'];
  customers: Array<ICustomerList> = [];

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
      type: 'time',
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
      type: 'time',
      label: 'End Time',
      optional: true,
      fieldValue: 'value',
      fieldLabel: 'label',
      options: this.registerService.getAllTimeAvailables(),
    },
    {
      property: 'newClient',
      label: 'New Client?',
      gridColumns: 12,
      gridSmColumns: 12,
      divider: 'PERSONAL DATA',
      type: 'boolean',
      booleanTrue: 'Yes',
      booleanFalse: 'No',
    },
    {
      property: 'firstName',
      required: true,
      minLength: 4,
      maxLength: 50,
      gridColumns: 6,
      gridSmColumns: 12,
      placeholder: 'Type your name',
      visible: false
    },
    {
      property: 'lastName',
      required: true,
      minLength: 4,
      maxLength: 50,
      gridColumns: 6,
      gridSmColumns: 12,
      placeholder: 'Type your last name',
      visible: false
    },
    {
      property: 'customerId',
      gridColumns: 6,
      gridSmColumns: 12,
      label: 'Customer',
      required: true,
      format: ['firstName', 'lastName'],
      fieldLabel: 'firstName',
      fieldValue: 'id',
      visible: true,
      optionsService: 'http://localhost:9094/users/customers',
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

  constructor(
    private readonly route: ActivatedRoute,
    public readonly poNotification: PoNotificationService,
    private readonly registerService: AppointmentCreateService,
    private readonly customerService: CustomersListService,
    private readonly location: Location) {}

  ngOnInit() {

    this.customerService.list().subscribe((data) => this.customers = data.items);

    const {startDate: startDateStr, endDate: endDateStr} = this.route.snapshot.queryParams;

    if(startDateStr) {
      const startDate = parseISO(startDateStr);
      const endDate = parseISO(endDateStr);

      this.createAppointment = {
        date: startDateStr,
        timeStart: `${getHours(startDate)}:${this.transformMinutes(getMinutes(startDate))}`,
        timeEnd: `${getHours(endDate)}:${this.transformMinutes(getMinutes(endDate))}`
      };
    }

  }

  transformMinutes(minutes: number): string {
    return minutes == 0 ? '00' : minutes.toString();
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

  onChangeFields(changedValue: PoDynamicFormFieldChanged): PoDynamicFormValidation {
    if (changedValue.value.newClient) {
      return {
        value: { customer: undefined, firstName: undefined, lastName: undefined },
        fields: [
          {
            property: 'customerId',
            visible: false,
          },
          {
            property: 'firstName',
            visible: true,
          },
          {
            property: 'lastName',
            visible: true,
          }
        ]
      };

    } else {
      return {
        value: { customerId: undefined, firstName: undefined, lastName: undefined },
        fields: [
          {
            property: 'customerId',
            visible: true,
          },
          {
            property: 'firstName',
            visible: false,
          },
          {
            property: 'lastName',
            visible: false,
          }
        ]
      };
    }
  }

}
