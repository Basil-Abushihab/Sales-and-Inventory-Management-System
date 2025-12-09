export interface Warehouse {
  WarehouseID: number;
  WarehouseName: string;
  Location?: string | null;
}

export interface CreateWarehousePayload {
  WarehouseName: string;
  Location?: string | null;
}

export interface UpdateWarehousePayload {
  WarehouseName?: string;
  Location?: string | null;
}

