import { useEffect, useState } from "react";
import type { Product } from "@/types";
import { ProductService } from "../service/productService";

export const useProducts = () => {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const result = await ProductService.getAll();
      setData(result);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    data,
    setData,
    isLoading,
    refresh: fetchProducts,
  };
};
