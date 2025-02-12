"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import ProtectedRoute from "@/components/protectedRoute";

import client from "@/sanity/lib/client";

const TotalProducts = () => {
  const [Products, setProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const Products = await client.fetch(`*[_type == "products"]`);

        setProducts(Products.length);
      } catch (error) {
        console.error("Error fetching Products from Sanity:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProtectedRoute>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold mt-1">{Products}</p>
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

export default TotalProducts;
