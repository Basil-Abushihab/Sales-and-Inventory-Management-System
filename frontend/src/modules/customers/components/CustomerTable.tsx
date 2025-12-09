import { Button } from "@/components/ui/button";
import type { Customer } from "@/types";
import { motion } from "framer-motion";
import { Edit2, Trash2, Check, X } from "lucide-react";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { CustomersService } from "../service/customersService";

type CustomersTableProps = {
  data: Customer[];
  setData: Dispatch<SetStateAction<Customer[]>>;
};

export function CustomersTable({ data, setData }: CustomersTableProps) {
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Omit<Customer, "CustomerID">>({
    Name: "",
    Phone: "",
    Email: "",
    Address: "",
  });

  const startEditing = (customer: Customer) => {
    setEditId(customer.CustomerID);
    setEditForm({
      Name: customer.Name,
      Phone: customer.Phone,
      Email: customer.Email,
      Address: customer.Address,
    });
  };

  const saveEditing =async () => {
    if (!editId) return;
    const response=await CustomersService.updateCustomer(editId,editForm);
    if(!response){
      console.error("Failed to update customer");
      setEditId(null);
      return;
    }
    setData((prev)=>{
      return prev.map((c)=>{
        if(c.CustomerID===editId){
          return {...c,...response};
        }
        return c;
      
      })
    });
    setEditId(null);
  };

  const deleteCustomer = async (id: number) => {
    const response=await CustomersService.deleteCustomer(id);
    if(!response){
      console.error("Failed to delete customer");
      return;
    }
    setData(data.filter((c) => c.CustomerID !== id));
  }
  const cancelEditing = () => {
    setEditId(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Phone</th>
            <th className="table-header">Email</th>
            <th className="table-header">Address</th>
            <th className="table-header text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((c, i) => {
            const isEditing = editId === c.CustomerID;

            return (
              <motion.tr
                key={c.CustomerID}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="table-row"
              >
                {/* NAME */}
                <td className="table-data text-center">
                  {isEditing ? (
                    <input
                      className="border rounded-lg px-2 py-1 w-3/4"
                      value={editForm.Name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, Name: e.target.value })
                      }
                    />
                  ) : (
                    c.Name
                  )}
                </td>

                {/* PHONE */}
                <td className="table-data text-center">
                  {isEditing ? (
                    <input
                      className="border rounded-lg px-2 py-1 w-3/4"
                      value={editForm.Phone??""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, Phone: e.target.value })
                      }
                    />
                  ) : (
                    c.Phone
                  )}
                </td>

                {/* EMAIL */}
                <td className="table-data text-center">
                  {isEditing ? (
                    <input
                      className="border rounded-lg px-2 py-1 w-3/4"
                      value={editForm.Email??""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, Email: e.target.value })
                      }
                    />
                  ) : (
                    c.Email
                  )}
                </td>

                {/* ADDRESS */}
                <td className="table-data text-center">
                  {isEditing ? (
                    <input
                      className="border rounded-lg px-2 py-1 w-3/4"
                      value={editForm.Address??""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, Address: e.target.value })
                      }
                    />
                  ) : (
                    c.Address
                  )}
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    {isEditing ? (
                      <>
                        <Button
                          variant="secondary"
                          className="cursor-pointer hover:scale-110 flex items-center"
                          onClick={saveEditing}
                        >
                          <Check className="w-4 h-4" />
                        </Button>

                        <Button
                          variant="destructive"
                          className="cursor-pointer hover:scale-110 flex items-center"
                          onClick={cancelEditing}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="secondary"
                          className="cursor-pointer hover:scale-110 flex items-center"
                          onClick={() => startEditing(c)}
                        >
                          <Edit2 className="icon-sm" />
                        </Button>

                        <Button
                          variant="destructive"
                          onClick={deleteCustomer.bind(null,c.CustomerID)}
                          className="cursor-pointer hover:scale-110 flex items-center"
                        >
                          <Trash2 className="icon-sm" />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
