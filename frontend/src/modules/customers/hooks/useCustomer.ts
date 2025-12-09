import { useEffect, useState } from "react";
import type { Customer } from "@/types";
import { CustomersService } from "../service/customersService";

export const useCustomer = () => {
  const [data, setData] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const result = await CustomersService.getCustomers();
      setData(result);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return {
    data,
    setData,
    isLoading,
    refresh: fetchCustomers, // optional utility
  };
};
