
export interface IAppointmentList {
  id: string;
  startDate: Date;
  endDate: Date;
  status: string;
  provider: {
    id: string;
    name: string;
  };
  customer: {
    id: string;
    name: string;
  };
  work: {
    id: string;
    name: string;
  };
}

