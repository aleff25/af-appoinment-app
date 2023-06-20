import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';

import { PoMenuItem, PoPageAction } from '@po-ui/ng-components';

import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { AppointmentListService } from '../services/appointments/appointment-list.service';
import { IAppointmentList } from '../core/entities/appointmet/appointmet.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    AppointmentListService,
  ]
})
export class HomeComponent implements OnInit {

  readonly pageActions: Array<PoPageAction> = [];

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
    initialView: 'dayGridMonth',
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

  constructor(
    private changeDetector: ChangeDetectorRef,
    private appointmentListService: AppointmentListService) {
  }

  ngOnInit() {
    this.appointmentListService.list('2023-05-01T08:00:00', '2023-05-30T21:00:00')
      .subscribe((data) => {
        this.appointments = data.items;
        this.calendarOptions.events = this.appointments.map((appoinment) => {
            return {
              id: appoinment.id,
              title: appoinment.provider.name + ' - ' + appoinment.customer.name,
              start: appoinment.startDate.toLocaleString(),
              end: appoinment.endDate.toLocaleString(),
            }
        })
        this.changeDetector.detectChanges();
      })
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      console.log(selectInfo);

      calendarApi.addEvent({
        id: '2123165498798',
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
}
