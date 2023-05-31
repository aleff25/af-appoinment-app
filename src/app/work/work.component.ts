import { Component, OnInit, ViewChild } from '@angular/core';

import { PoBreadcrumb, PoDynamicViewField, PoModalComponent, PoPageAction, PoTableColumn } from '@po-ui/ng-components';
import { PoPageDynamicTableActions, PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';
import { ListWorkService } from '../services/works/list-work.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css'],
  providers: [ListWorkService]
})
export class WorkComponent implements OnInit {

  @ViewChild('userDetailModal') userDetailModal!: PoModalComponent;

  detailedWork: any;

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Works' }]
  };

  // PLEASE ADD THE API URL SERVICE HERE
  readonly apiService = 'http://localhost:9094/works';

  readonly actions: PoPageDynamicTableActions = {
    new: '/works/new',
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
      icon: 'po-icon-document'
    },
    {
      label: 'Dependents',
      action: this.onClickUserDetail.bind(this),
      icon: 'po-icon-document'
    }
  ];

  items: Array<any> = [];

  constructor(private listWorkService: ListWorkService) { }

  ngOnInit() {}


  private onClickUserDetail(work: any) {
    this.detailedWork = work;

    this.userDetailModal.open();
  }


}
