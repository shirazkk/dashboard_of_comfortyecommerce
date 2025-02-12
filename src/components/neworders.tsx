"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import ProtectedRoute from "@/components/protectedRoute";
import { format } from "date-fns";
import client from "@/sanity/lib/client";

// Define the type for the Order response
interface Order {
  orderDate: string;
}

const NewOrders: React.FC = () => {
  const [todayOrders, setTodayOrders] = useState<number>(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Typing the response from client.fetch to Order[]
        const orders: Order[] = await client.fetch(`*[_type == "order"]{ orderDate }`);

        const todayDate = format(new Date(), "yyyy-MM-dd");
        const todayOrdersCount = orders.filter(
          (order) => order.orderDate && order.orderDate.startsWith(todayDate)
        ).length;

        setTodayOrders(todayOrdersCount);
      } catch (error) {
        console.error("Error fetching orders from Sanity:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ProtectedRoute>
      <Link href="/admin/dashboard/orders">
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-500">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold">Manage Orders</h2>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  View and manage all customer orders.
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-green-600">
                    {todayOrders} new orders today
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </ProtectedRoute>
  );
};

export default NewOrders;
