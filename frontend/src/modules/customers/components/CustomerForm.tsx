import { useState, type Dispatch, type SetStateAction } from "react";
import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import type { Customer } from "@/types";
import { CustomersService } from "../service/customersService";

type CustomerFormProps = {
  data: Customer[];
  setData: Dispatch<SetStateAction<Customer[]>>;
};

export function CustomerForm({ data, setData }: CustomerFormProps) {
  const [show, setShow] = useState(false);

  const [form, setForm] = useState<Omit<Customer, "CustomerID">>({
    Name: "",
    Phone: "",
    Email: "",
    Address: "",
  });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response=await CustomersService.createCustomer({...form,});
    if(!response){
      console.error("Failed to create customer");
      resetForm();
      return;
    }
      setData([...data, { ...response }]);
      resetForm();
  };

  const resetForm = () => {
    setShow(false);
    setForm({ Name: "", Phone: "", Email: "", Address: "" });
  };

  const inputClasses =
    "peer w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white " +
    "focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all";

  return (
    <>
      <div className="flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.93 }}
          onClick={() => setShow(true)}
          className="flex items-center gap-2 px-6 py-3
            bg-gradient-to-r from-orange-500 to-red-500 
            text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
        >
          <Plus className="w-5 h-5" />
          Add Customer
        </motion.button>
      </div>

      {/* FORM CARD */}
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-white rounded-2xl p-7 mt-5 shadow-xl border border-orange-100"
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={resetForm}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-xl font-bold text-gray-800 mb-6">
             Add New Customer
          </h3>

          <form onSubmit={submit} className="grid grid-cols-2 gap-6">

            {/* NAME */}
            <div className="relative">
              <input
                type="text"
                value={form.Name}
                onChange={(e) => setForm({ ...form, Name: e.target.value })}
                className={inputClasses}
                required
              />
              <label className="form-label">Name</label>
            </div>

            {/* PHONE */}
            <div className="relative">
              <input
                type="tel"
                value={form.Phone??''}
                onChange={(e) => setForm({ ...form, Phone: e.target.value })}
                className={inputClasses}
                required
              />
              <label className="form-label">Phone</label>
            </div>

            {/* EMAIL */}
            <div className="relative">
              <input
                type="email"
                value={form.Email??''}
                onChange={(e) => setForm({ ...form, Email: e.target.value })}
                className={inputClasses}
                required
              />
              <label className="form-label">Email</label>
            </div>

            {/* ADDRESS */}
            <div className="relative">
              <input
                type="text"
                value={form.Address??''}
                onChange={(e) => setForm({ ...form, Address: e.target.value })}
                className={inputClasses}
                required
              />
              <label className="form-label">Address</label>
            </div>

            {/* BUTTONS */}
            <div className="col-span-2 flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-lg font-semibold transition"
              >
                 Add Customer
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </>
  );
}
