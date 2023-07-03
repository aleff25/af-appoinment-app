import { Component, OnInit, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoDynamicViewField, PoI18nPipe, PoI18nService, PoModalComponent } from '@po-ui/ng-components';

import { PoPageDynamicTableActions, PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  @ViewChild('userDetailModal') userDetailModal!: PoModalComponent;

  detailedUser: any;
  literals: any = {};

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Appointments' }]
  };

  // PLEASE ADD THE API URL SERVICE HERE
  readonly apiService = 'https://po-sample-api.fly.dev/v1/people';

  readonly actions: PoPageDynamicTableActions = {
    new: '/appointments/new',
  };

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'status', label: 'status', tag: true, gridLgColumns: 4, divider: 'Personal Data' },
    { property: 'name', label: 'name', gridLgColumns: 4 },
    { property: 'nickname', label: 'User name', gridLgColumns: 4 },
    { property: 'email', label: 'email', gridLgColumns: 4 },
    { property: 'birthdate', label: 'birthdate', gridLgColumns: 4, type: 'date' },
    { property: 'genre', label: 'genre', gridLgColumns: 4, gridSmColumns: 6 },
    { property: 'cityName', label: 'City', divider: 'Address' },
    { property: 'state', label: 'state' },
    { property: 'country', label: 'country' }
  ];

  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [];

  constructor(
    private poI18nPipe: PoI18nPipe,
    private poI18nService: PoI18nService,
  ) { }

  ngOnInit() {
    this.poI18nService.getLiterals()
      .subscribe((literals) => {
        this.literals = literals;
        this.setUp()
      })
  }

  private setUp() {
    this.tableCustomActions = [
      {
        label: this.literals.details,
        action: this.onClickUserDetail.bind(this),
        disabled: this.isUserInactive.bind(this),
        icon: 'po-icon-user'
      },
      {
        label: this.literals.dependents,
        action: this.onClickUserDetail.bind(this),
        disabled: this.isUserInactive.bind(this),
        icon: 'po-icon-user'
      }
    ]
  }

  isUserInactive(person: any) {
    return person.status === 'inactive';
  }

  private onClickUserDetail(user: any) {
    this.detailedUser = user;

    this.userDetailModal.open();
  }

}
