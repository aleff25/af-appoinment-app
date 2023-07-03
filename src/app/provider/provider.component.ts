import { Component, OnInit, ViewChild } from '@angular/core';

import { PoBreadcrumb, PoDynamicViewField, PoI18nService, PoModalComponent } from '@po-ui/ng-components';
import { PoPageDynamicTableActions, PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {


  @ViewChild('userDetailModal') userDetailModal!: PoModalComponent;

  literals: any = {};
  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [];
  detailedUser: any;

  readonly apiService = 'http://localhost:9094/users/providers';

  breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Providers' }]
  };

  readonly actions: PoPageDynamicTableActions = {
    new: '/providers/new',
  };

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'status', tag: true, gridLgColumns: 4, divider: 'Personal Data' },
    { property: 'name', gridLgColumns: 4 },
  ];


  constructor(
    private poI18nService: PoI18nService) { }

  ngOnInit() {
    this.poI18nService.getLiterals()
      .subscribe((literals) => {
        this.literals = literals;
        this.setUp();
        this.breadcrumb = this.createBreadcrumb();
      })
  }

  isUserInactive(person: any) {
    return person.status === 'inactive';
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

  private createBreadcrumb() {
    return {
      items: [{ label: this.literals.home, link: '/' }, { label: this.literals.customers }]
    }
  }

  private onClickUserDetail(user: any) {
    this.detailedUser = user;

    this.userDetailModal.open();
  }
}
