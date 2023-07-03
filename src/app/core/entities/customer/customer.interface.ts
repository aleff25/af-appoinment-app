export interface ICustomerList {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  street: string;
  city: string;
  postCode: string;
  roles: Array<string>;
}
