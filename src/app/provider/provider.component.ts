import { Component, OnInit, ViewChild } from '@angular/core';

import { PoBreadcrumb, PoDynamicViewField, PoModalComponent } from '@po-ui/ng-components';
import { PoPageDynamicTableActions, PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {


  @ViewChild('userDetailModal') userDetailModal!: PoModalComponent;

  readonly apiService = 'http://localhost:9094/users/providers';

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Providers' }]
  };

  readonly actions: PoPageDynamicTableActions = {
    new: '/providers/new',
  };

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'status', tag: true, gridLgColumns: 4, divider: 'Personal Data' },
    { property: 'name', gridLgColumns: 4 },
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

  detailedUser: any;

  constructor() { }

  ngOnInit() {
  }

  isUserInactive(person: any) {
    return person.status === 'inactive';
  }

  private onClickUserDetail(user: any) {
    this.detailedUser = user;

    this.userDetailModal.open();
  }
}
