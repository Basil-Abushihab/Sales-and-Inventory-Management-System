// src/modules/orders/components/OrdersTable.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import type { OrderWithDetails } from "@/types";

type Props = {
  orders: OrderWithDetails[];
  onDeleteOrder: (id: number) => void;
  onUpdateDetail: (orderId: number, productId: number, qty: number) => void;
  onDeleteDetail: (orderId: number, productId: number) => void;
};

export const OrdersTable = ({
  orders,
  onDeleteOrder,
  onUpdateDetail,
  onDeleteDetail,
}: Props) => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [qty, setQty] = useState<number>(0);

  return (
    <div className="rounded-2xl border border-slate-100 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/80">
            <TableHead className="text-xs">Order ID</TableHead>
            <TableHead className="text-xs">Customer ID</TableHead>
            <TableHead className="text-xs">Date</TableHead>
            <TableHead className="text-xs">Status</TableHead>
            <TableHead className="text-xs">Total</TableHead>
            <TableHead className="text-xs text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map(order => (
            <>
              <TableRow key={order.OrderID}>
                <TableCell className="text-xs">{order.OrderID}</TableCell>
                <TableCell className="text-xs">{order.CustomerID}</TableCell>
                <TableCell className="text-xs">{order.OrderDate}</TableCell>
                <TableCell className="text-xs">{order.Status}</TableCell>
                <TableCell className="text-xs">${order.TotalAmount}</TableCell>

                <TableCell className="text-xs text-right space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-[11px]"
                    onClick={() =>
                      setExpanded(expanded === order.OrderID ? null : order.OrderID)
                    }
                  >
                    {expanded === order.OrderID ? "Hide" : "Details"}
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-7 text-[11px]"
                    onClick={() => onDeleteOrder(order.OrderID)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>

              {/* Expanded Order Details */}
              {expanded === order.OrderID && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="p-4 bg-slate-50 rounded-xl border mt-2">
                      <h4 className="font-semibold text-xs mb-3">
                        Order Items
                      </h4>

                      <Table className="w-full">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs">Product</TableHead>
                            <TableHead className="text-xs">Qty</TableHead>
                            <TableHead className="text-xs">Unit Price</TableHead>
                            <TableHead className="text-xs">Total</TableHead>
                            <TableHead className="text-xs text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {order.orderDetails.map(d => {
                            const key = `${order.OrderID}-${d.ProductID}`;
                            const editing = editingKey === key;

                            return (
                              <TableRow key={key}>
                                <TableCell className="text-xs">{d.ProductID}</TableCell>

                                {/* Quantity Editable */}
                                <TableCell className="text-xs">
                                  {editing ? (
                                    <input
                                      type="number"
                                      className="w-20 px-2 py-1 rounded border text-xs"
                                      value={qty}
                                      onChange={e => setQty(Number(e.target.value))}
                                    />
                                  ) : (
                                    d.Quantity
                                  )}
                                </TableCell>

                                <TableCell className="text-xs">{d.UnitPrice}</TableCell>
                                <TableCell className="text-xs">{d.LineTotal}</TableCell>

                                <TableCell className="text-xs text-right space-x-2">
                                  {!editing ? (
                                    <>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 text-[11px]"
                                        onClick={() => {
                                          setEditingKey(key);
                                          setQty(d.Quantity);
                                        }}
                                      >
                                        Edit
                                      </Button>

                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        className="h-7 text-[11px]"
                                        onClick={() =>
                                          onDeleteDetail(order.OrderID, d.ProductID)
                                        }
                                      >
                                        Delete
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      <Button
                                        size="sm"
                                        className="h-7 text-[11px]"
                                        onClick={() => {
                                          onUpdateDetail(order.OrderID, d.ProductID, qty);
                                          setEditingKey(null);
                                        }}
                                      >
                                        Save
                                      </Button>

                                      <Button
                                        size="sm"
                                        variant="secondary"
                                        className="h-7 text-[11px]"
                                        onClick={() => setEditingKey(null)}
                                      >
                                        Cancel
                                      </Button>
                                    </>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
