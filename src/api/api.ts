import axios, { AxiosResponse } from "axios";
import { MeResponse } from "../types/response.types";
import { Appointment } from "../types/appointment.types";

class Api {
  public api;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_PUBLIC_API_URL,
    });
  }

  public async me(): Promise<AxiosResponse<MeResponse, any>> {
    const response = await this.api.get<MeResponse>("me");

    return response;
  }

  public async submit(appointment: Appointment): Promise<any> {
    const response = await this.api.post<any>("submit", appointment);

    return response;
  }
}

const api = new Api();

export default api;
