"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import ProtectedRoute from "@/components/protectedRoute";

import client from "@/sanity/lib/client";

const TotalOrders = () => {
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await client.fetch(`*[_type == "order"]{ orderDate }`);

        setTotalOrders(orders.length);
      } catch (error) {
        console.error("Error fetching orders from Sanity:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ProtectedRoute>
   
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold mt-1">{totalOrders}</p>
              </div>
              <div className="p-3 rounded-full bg-green-500">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      
    </ProtectedRoute>
  );
};

export default TotalOrders;
