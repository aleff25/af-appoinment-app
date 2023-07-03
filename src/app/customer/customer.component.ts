import { Component, OnInit, ViewChild } from '@angular/core';

import { PoBreadcrumb, PoDynamicViewField, PoI18nPipe, PoI18nService, PoModalComponent, PoPageAction, PoTableColumn } from '@po-ui/ng-components';
import { PoPageDynamicTableActions, PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @ViewChild('userDetailModal') userDetailModal!: PoModalComponent;

  literals: any = {};
  detailedUser: any;
  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [];

  readonly apiService = 'http://localhost:9094/users/customers';

  breadcrumb: PoBreadcrumb = this.createBreadcrumb();

  readonly actions: PoPageDynamicTableActions = {
    new: '/customers/new',
  };

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'status', tag: true, gridLgColumns: 4, divider: 'Personal Data' },
    { property: 'name', gridLgColumns: 4 },
  ];


  constructor(
    private poI18nPipe: PoI18nPipe,
    private poI18nService: PoI18nService,
  ) { }

  ngOnInit() {
    this.poI18nService.getLiterals()
      .subscribe((literals) => {
        this.literals = literals;
        this.setUp();
        this.breadcrumb = this.createBreadcrumb();
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

  private createBreadcrumb() {
    return {
      items: [{ label: this.literals.home, link: '/' }, { label: this.literals.customers }]
    }
  }
}
