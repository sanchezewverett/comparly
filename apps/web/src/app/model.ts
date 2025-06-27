export type FilterFromState = {
  name?: string;
  minPrice?: string;
  maxPrice?: string;
  brand?: string;
  category?: string;
  query?: string;
};

export type CategoryNode = {
  id: number;
  name: string;
  nested: CategoryNode[];
};
