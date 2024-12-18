import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AppointmentCreateService {


  private RESOURCE_URL = 'http://localhost:9094';

  constructor(private http: HttpClient) {}


  create(body: any): Observable<void> {
    return this.http.post<void>(`${this.RESOURCE_URL}/appointments`, body)
  }

  getCurrentDayString(): string {
    const inputDate = new Date();

    let date, month, year;

    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();

      date = date
          .toString()
          .padStart(2, '0');

      month = month
          .toString()
          .padStart(2, '0');

    return `${year}/${month}/${date}`;
  }

  getAllTimeAvailables() {
    return [
      { label: "06:00", value: "06:00" },
      { label: "06:15", value: "06:15" },
      { label: "06:30", value: "06:30" },
      { label: "06:45", value: "06:45" },
      { label: "07:00", value: "07:00" },
      { label: "07:15", value: "07:15" },
      { label: "07:30", value: "07:30" },
      { label: "07:45", value: "07:45" },
      { label: "08:00", value: "08:00" },
      { label: "08:15", value: "08:15" },
      { label: "08:30", value: "08:30" },
      { label: "08:45", value: "08:45" },
      { label: "09:00", value: "09:00" },
      { label: "09:15", value: "09:15" },
      { label: "09:30", value: "09:30" },
      { label: "09:45", value: "09:45" },
      { label: "10:00", value: "10:00" },
      { label: "10:15", value: "10:15" },
      { label: "10:30", value: "10:30" },
      { label: "10:45", value: "10:45" },
      { label: "11:00", value: "11:00" },
      { label: "11:15", value: "11:15" },
      { label: "11:30", value: "11:30" },
      { label: "11:45", value: "11:45" },
      { label: "12:00", value: "12:00" },
      { label: "12:15", value: "12:15" },
      { label: "12:30", value: "12:30" },
      { label: "12:45", value: "12:45" },
      { label: "13:00", value: "13:00" },
      { label: "13:15", value: "13:15" },
      { label: "13:30", value: "13:30" },
      { label: "13:45", value: "13:45" },
      { label: "14:00", value: "14:00" },
      { label: "14:15", value: "14:15" },
      { label: "14:30", value: "14:30" },
      { label: "14:45", value: "14:45" },
      { label: "15:00", value: "15:00" },
      { label: "15:15", value: "15:15" },
      { label: "15:30", value: "15:30" },
      { label: "15:45", value: "15:45" },
      { label: "16:00", value: "16:00" },
      { label: "16:15", value: "16:15" },
      { label: "16:30", value: "16:30" },
      { label: "16:45", value: "16:45" },
      { label: "17:00", value: "17:00" },
      { label: "17:15", value: "17:15" },
      { label: "17:30", value: "17:30" },
      { label: "17:45", value: "17:45" },
      { label: "18:00", value: "18:00" },
      { label: "18:15", value: "18:15" },
      { label: "18:30", value: "18:30" },
      { label: "18:45", value: "18:45" },
      { label: "19:00", value: "19:00" },
      { label: "19:15", value: "19:15" },
      { label: "19:30", value: "19:30" },
      { label: "19:45", value: "19:45" },
      { label: "20:00", value: "20:00" }
    ]
  }
}
