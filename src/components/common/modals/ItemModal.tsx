export interface ItemModal {
  id: number;
  itemName: string;
  categoryId: number;
  categoryName: string;
  materialId: number;
  materialName: string;
  purity: string;
  weight: number;
  price: number;
  description: string;
  images: string[];
}