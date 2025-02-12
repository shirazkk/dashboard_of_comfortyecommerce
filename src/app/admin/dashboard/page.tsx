import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Package,
  Settings,
  TrendingUp,
} from "lucide-react";
import ProtectedRoute from "@/components/protectedRoute";
import TotalOrders from "@/components/totalorders";
import NewOrders from "@/components/neworders";
import TotalRevenue from "@/components/total_revenue";
import TotalProducts from "@/components/totalproducts";

interface DashboardCardProps {
  href: string;
  title: string;
  description: string;
  icon: React.ElementType;
  stats?: string;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  href,
  title,
  description,
  icon: Icon,
  stats,
  color,
}) => (
  <Link href={href} className="block w-full">
    <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-102">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className={`p-3 rounded-xl ${color} shrink-0`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 space-y-2">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-gray-600 text-sm">{description}</p>
            {stats && (
              <div className="flex items-center gap-2 mt-3">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">
                  {stats}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);



const Dashboard: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Welcome back, Shiraz
            </h1>
            <p className="text-gray-600 mt-2">
              Here&apos;s what&apos;s happening in your store today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
           <TotalRevenue/>
            <TotalOrders />
            <TotalProducts/>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <NewOrders />
            <DashboardCard
              href="/admin/dashboard/products"
              title="Manage Products"
              description="Add, edit, or remove products."
              icon={Package}
              color="bg-green-500"
            />
         
            <DashboardCard
              href="/admin/settings"
              title="Settings"
              description="Configure your store settings."
              icon={Settings}
              color="bg-gray-500"
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;