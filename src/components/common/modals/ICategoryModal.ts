import type { IMaterialModal } from "./IMaterialModal";

export interface ICategoryModal {
  categoryId: string;
  categoryName: string;
  materials?: IMaterialModal[];
}