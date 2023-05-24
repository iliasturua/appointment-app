export interface MeResponse {
  status: string;
  data: {
    user_id: string;
    name: string;
    email: string;
    age: number;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
    };
    phone_numbers: Array<string>;
  };
}
