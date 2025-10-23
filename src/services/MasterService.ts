import axios from "axios";
import { BASE_URL } from "../constants/Constants";

export class MasterService {
  public static getMaterials = async () => {
    const response = await axios.get(`${BASE_URL}/materials`);
    return response?.data.data;
  };

  public static getCategories = async () => {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response?.data.data;
  };

  public static addMaterial = async (materialData: any) => {
    const response = await axios.post(`${BASE_URL}/addMaterials`, materialData);
    return response;
  };

  public static addCategory = async (categoryData: any) => {
    const response = await axios.post(`${BASE_URL}/addcategory`, categoryData);
    return response;
  };

  public static mappingCategoryMaterials = async () => {
    const response = await axios.get(`${BASE_URL}/mappingMaterials`);
    return response?.data;
  };

   public static addMaterialsMapping = async (materialData: any) => {
    const response = await axios.post(`${BASE_URL}/addMaterialsMapping`, materialData);
    return response;
  };
}
