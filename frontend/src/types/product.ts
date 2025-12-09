export interface Product {
  ProductID: number;
  Name: string;
  UnitPrice: number;
  Status: boolean;
  ReorderLevel: number;
}

export interface CreateProductPayload {
  Name: string;
  UnitPrice: number;
  Status: boolean;
  ReorderLevel: number;
}

export interface UpdateProductPayload {
  Name?: string;
  UnitPrice?: number;
  Status?: boolean;
  ReorderLevel?: number;
}

