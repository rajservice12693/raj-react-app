import axios from "axios";
import { BASE_URL } from "../constants/Constants";

export class LoginService {
  public static login = async (loginForData: any) => {
    const response = await axios.post(`${BASE_URL}/login`, loginForData);
    return response?.data;
  };

  public static getItems = async () => {
    const response = await axios.get(`${BASE_URL}/items`);
    return response?.data;
  };
}
