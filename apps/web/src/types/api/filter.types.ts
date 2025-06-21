export interface FiltersResponse {
  data: Filters;
}

export interface Filters {
  categories: Category[];
  brands: Brand[];
}

export interface Category {
  id: number;
  name: string;
}

export interface Brand {
  brand: string;
}
