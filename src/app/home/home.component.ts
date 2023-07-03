import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';

import { PoDynamicViewField, PoMenuItem, PoModalComponent, PoPageAction } from '@po-ui/ng-components';

import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { AppointmentListService } from '../services/appointments/appointment-list.service';
import { IAppointmentList } from '../core/entities/appointmet/appointmet.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { format, lastDayOfMonth } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    AppointmentListService,
  ]
})
export class HomeComponent implements OnInit {

  @ViewChild('userDetailModal') userDetailModal!: PoModalComponent;

  readonly pageActions: Array<PoPageAction> = [];

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'status', tag: true, gridLgColumns: 4, divider: 'Appointment Data' },
    { property: 'providerView', label: 'Provider',gridLgColumns: 4 },
    { property: 'customerView', label: 'Customer', gridLgColumns: 4 },
    { property: 'startDate', gridLgColumns: 4, type: 'dateTime' },
    { property: 'endDate', gridLgColumns: 4, type: 'dateTime' },
    { property: 'workView', label: 'Work', gridLgColumns: 4 },
  ];

  menus: Array<PoMenuItem> = [
    {
      label: 'Appointments',
      link: '/appointments',
      icon: 'po-icon-clock',
      shortLabel: 'Appointments',
      badge: { value: 1 }
    },
    {
      label: 'Works',
      link: '/works',
      icon: 'po-icon-document-filled',
      shortLabel: 'Works',
    },
    {
      label: 'Providers',
      link: '/providers',
      icon: 'po-icon-users',
      shortLabel: 'Providers',
    },
    {
      label: 'Customers',
      link: '/customers',
      icon: 'po-icon-user',
      shortLabel: 'Customers',
    },
    {
      label: 'Invoices',
      link: '/invoices',
      icon: 'po-icon-sale',
      shortLabel: 'Invoices',
    },
  ];

  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'timeGridWeek',
    initialEvents:  [
      {
        id: '123456',
        title: 'All-day event',
        start: new Date().toISOString().replace(/T.*$/, '')
      },
      {
        id: '123457',
        title: 'Timed event',
        start: new Date().toISOString().replace(/T.*$/, '') + 'T00:00:00',
        end: new Date().toISOString().replace(/T.*$/, '') + 'T03:00:00'
      },
      {
        id: '123458',
        title: 'Timed event',
        start: new Date().toISOString().replace(/T.*$/, '') + 'T12:00:00',
        end: new Date().toISOString().replace(/T.*$/, '') + 'T15:00:00'
      }
    ], // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };

  currentEvents: EventApi[] = [];
  appointments: IAppointmentList[] = [];
  detailedUser: any;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly appointmentListService: AppointmentListService) {
  }

  ngOnInit() {

    const today = new Date()
    const firstDateOfMonth = format(today, 'yyyy-MM-01') + 'T08:00:00';
    const lastDateOfMonth = format(lastDayOfMonth(today), 'yyyy-MM-dd') + 'T21:00:00';

    this.appointmentListService.list(firstDateOfMonth, lastDateOfMonth)
      .subscribe((data) => {
        this.appointments = data.items;
        this.calendarOptions.events = this.appointments.map((appoinment) => {
            return {
              id: appoinment.id,
              title: appoinment.provider.name + ' - ' + appoinment.customer.name,
              start: appoinment.startDate.toLocaleString(),
              end: appoinment.endDate.toLocaleString(),
            }
        });
        this.changeDetector.detectChanges();
      })
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    this.router.navigate(['appointments', 'new'], {queryParams: {startDate: selectInfo.startStr, endDate: selectInfo.endStr}});
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.detailedUser = this.appointments.find((a) => a.id === clickInfo.event.id);
    this.detailedUser.providerView = this.detailedUser.provider.name;
    this.detailedUser.customerView = this.detailedUser.customer.name;
    this.detailedUser.workView = this.detailedUser.work.name;

    this.userDetailModal.open();
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
}
