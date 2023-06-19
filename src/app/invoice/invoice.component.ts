import { Component, OnInit, ViewChild } from '@angular/core';

import { PoBreadcrumb, PoDynamicViewField, PoModalComponent } from '@po-ui/ng-components';
import { PoPageDynamicTableActions, PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  @ViewChild('userDetailModal') userDetailModal!: PoModalComponent;

  readonly apiService = 'http://localhost:9094/invoices/all';

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Invoices' }]
  };

  readonly actions: PoPageDynamicTableActions = {
    new: '/invoices/new',
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
