"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import ProtectedRoute from "@/components/protectedRoute";

const TotalRevenue = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await fetch("/api/get-revenue");
        const data = await response.json();
        setTotalRevenue(data.totalRevenue);
      } catch (error) {
        console.error("Error fetching revenue from Stripe:", error);
      }
    };

    fetchRevenue();
  }, []);

  return (
    <ProtectedRoute>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold mt-1">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-500">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </ProtectedRoute>
  );
};

export default TotalRevenue;
