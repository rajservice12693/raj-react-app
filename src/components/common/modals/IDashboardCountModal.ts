export interface IDashboardCountModal {
  total: number;
  categoryTotal: number;
  materialTotal: number;
  totalMaterialCount: number;
  materialList: string[];
  categoryWise: CategoryWise[];
}

export interface CategoryWise {
  categoryName: string;
  categoryCount: number;
  categoryMaterial: {
    [materialName: string]: number; // dynamic key for each material
  };
}

