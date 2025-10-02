import axios from "axios";
import { BASE_URL } from "../constants/Constants";

export class Service {
  public static uploadItem = async (uploadItem: FormData) => {
    console.log("saveItems", uploadItem);
    const response = await axios.post(`${BASE_URL}/saveItems`, uploadItem, {
      headers: {},
    });
    return response;
  };

  public static items = async () => {
    const response = await axios.get(`${BASE_URL}/items`);
    return response.data;
  };

  public static deleteItems = async (itemId: string) => {
    const response = await axios.delete(`${BASE_URL}/item?itemId=${itemId}`);
    return response.data;
  };

  public static dashboardItemCounts = async () => {
    const response = await axios.get(`${BASE_URL}/dashboardCount`);
    return response.data;
  };
}
