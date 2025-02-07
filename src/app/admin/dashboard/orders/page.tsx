"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import ProtectedRoute from "@/components/protectedRoute";
import client from "@/sanity/lib/client";
import { Card, CardContent } from "@/components/ui/card";
import { Package2, Clock, CheckCircle2, Truck } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "react-hot-toast";
import { Order } from "../../../../../type";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    client
      .fetch(
        `*[_type == "order"]{
          _id,
          firstName,
          lastName,
          phone,
          email,
          address,
          city,
          zipCode,
          total,
          discount,
          orderDate,
          status,
          cartItems[]{
          product->{
            title,
            image
          },
          quantity
        }
        }`
      )
      .then((data) => setOrders(data))
      .catch((error) => {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders");
      })
      .finally(() => setloading(false));
  }, []);

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  const toggleOrderDetails = (orderId: string) => {
    setSelectedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const handleDelete = async (orderId: string) => {
    try {
      await client.delete(orderId);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
      toast.success("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order");
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await client.patch(orderId).set({ status: newStatus }).commit();

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      if (newStatus === "dispatch") {
        toast.success("Order dispatched successfully");
      } else if (newStatus === "success") {
        toast.success("Order completed successfully");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "dispatch":
        return <Truck className="w-5 h-5 text-blue-500" />;
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      default:
        return <Package2 className="w-5 h-5 text-gray-500" />;
    }
  };

  const DeleteButton = ({ orderId }: { orderId: string }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-red-500 hover:text-red-700">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            order.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={() => handleDelete(orderId)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <div className="hidden lg:flex flex-col w-64 bg-white h-screen fixed border-r">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
            </div>
            <nav className="flex-1 p-4">
              {["All", "pending", "dispatch", "success"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`w-full mb-2 flex items-center p-3 rounded-lg transition-all ${
                    filter === status
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {getStatusIcon(status === "All" ? null : status)}
                  <span className="ml-3 font-medium">
                    {status.charAt(0).toUpperCase() + status.slice(1)} Orders
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1 lg:ml-64">
            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredOrders.map((order) => (
                  <Card key={order._id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4 border-b bg-white">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {order.firstName} {order.lastName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {new Date(order.orderDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <select
                              value={order.status || ""}
                              onChange={(e) =>
                                handleStatusChange(order._id, e.target.value)
                              }
                              className="text-sm border rounded p-1"
                            >
                              <option value="pending">Pending</option>
                              <option value="dispatch">Dispatch</option>
                              <option value="success">Completed</option>
                            </select>
                            <DeleteButton orderId={order._id} />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">${order.total}</span>
                          <button
                            onClick={() => toggleOrderDetails(order._id)}
                            className="text-blue-600 text-sm hover:underline"
                          >
                            {selectedOrderId === order._id
                              ? "Hide Details"
                              : "View Details"}
                          </button>
                        </div>
                      </div>

                      {selectedOrderId === order._id && (
                        <div className="p-4 bg-gray-50">
                          <div className="space-y-2">
                            <p className="text-sm">
                              <span className="font-medium">Phone:</span>{" "}
                              {order.phone}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Email:</span>{" "}
                              {order.email}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Address:</span>{" "}
                              {order.address}, {order.city}
                            </p>
                            <div className="mt-4">
                              <p className="font-medium text-sm mb-2">
                                Order Items:
                              </p>
                              <div className="space-y-2">
                                {order.cartItems.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 bg-white p-2 rounded"
                                  >
                                    {item.product.image && (
                                      <Image
                                        src={urlFor(item.product.image).url()}
                                        width={40}
                                        height={40}
                                        alt={item.product.title}
                                        className="rounded"
                                      />
                                    )}
                                    <span className="text-sm">
                                      {item.product.title} (x{item.quantity})
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
