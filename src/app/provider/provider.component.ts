import { Component, OnInit } from '@angular/core';

import { PoPageAction, PoTableColumn } from '@po-ui/ng-components';
import { ListProviderService } from '../services/providers/list-provider.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css'],
  providers: [
    ListProviderService
  ]
})
export class ProviderComponent implements OnInit {

  readonly actions: Array<PoPageAction> = [
    // actions of table here
  ];

  readonly columns: Array<PoTableColumn> = [
    // columns of table here
    { property: 'firstName', label: 'First Name', width: '20%' },
    { property: 'lastName', label: 'Last Name', width: '35%' },
    { property: 'email', label: 'Email', width: '35%' },
    { property: 'phoneNumber', label: 'Phone Number', width: '35%' },
    { property: 'street', label: 'Street', width: '35%' },
    { property: 'city', label: 'City', width: '35%' },
    { property: 'postCode', label: 'Post Code', width: '35%' },
  ];

  items: Array<any> = [];

  constructor(private listProviderService: ListProviderService) { }

  ngOnInit() {
    this.listProviderService.list().subscribe((data) => this.items = data);
  }

}
