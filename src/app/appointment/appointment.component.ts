import { Component, OnInit, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoDynamicViewField, PoModalComponent } from '@po-ui/ng-components';

import { PoPageDynamicTableActions, PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  @ViewChild('userDetailModal') userDetailModal!: PoModalComponent;

  detailedUser: any;

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Appointments' }]
  };

  // PLEASE ADD THE API URL SERVICE HERE
  readonly apiService = 'https://po-sample-api.fly.dev/v1/people';

  readonly actions: PoPageDynamicTableActions = {
    new: '/appointments/new',
  };

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'status', tag: true, gridLgColumns: 4, divider: 'Personal Data' },
    { property: 'name', gridLgColumns: 4 },
    { property: 'nickname', label: 'User name', gridLgColumns: 4 },
    { property: 'email', gridLgColumns: 4 },
    { property: 'birthdate', gridLgColumns: 4, type: 'date' },
    { property: 'genre', gridLgColumns: 4, gridSmColumns: 6 },
    { property: 'cityName', label: 'City', divider: 'Address' },
    { property: 'state' },
    { property: 'country' }
  ];

  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [
    {
      label: 'Details',
      action: this.onClickUserDetail.bind(this),
      disabled: this.isUserInactive.bind(this),
      icon: 'po-icon-user'
    },
    {
      label: 'Dependents',
      action: this.onClickUserDetail.bind(this),
      disabled: this.isUserInactive.bind(this),
      icon: 'po-icon-user'
    }
  ];

  constructor() { }

  ngOnInit() { }

  isUserInactive(person: any) {
    return person.status === 'inactive';
  }

  private onClickUserDetail(user: any) {
    this.detailedUser = user;

    this.userDetailModal.open();
  }

}
