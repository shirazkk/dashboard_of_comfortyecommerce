import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShoppingBag,
  Package,
  Users,
  Settings,
  TrendingUp,
  DollarSign,
  ShoppingCart,
} from "lucide-react";
import ProtectedRoute from "@/components/protectedRoute";

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
  <Link href={href}>
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${color}`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            {stats && (
              <div className="flex items-center gap-2">
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

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, Shiraz
            </h1>
            <p className="text-gray-600 mt-1">
              Here&aposs; what&aposs; happening in your store today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Revenue"
              value="$24,563"
              icon={DollarSign}
              color="bg-blue-500"
            />
            <StatsCard
              title="Total Orders"
              value="450"
              icon={ShoppingCart}
              color="bg-green-500"
            />
           
            <StatsCard
              title="Total Customers"
              value="2,345"
              icon={Users}
              color="bg-purple-500"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard
              href="/admin/dashboard/orders"
              title="Manage Orders"
              description="View and manage all customer orders."
              icon={ShoppingBag}
              stats="12 new orders today"
              color="bg-blue-500"
            />
            <DashboardCard
              href="/admin/products"
              title="Manage Products"
              description="Add, edit, or remove products."
              icon={Package}
              stats="3 low stock items"
              color="bg-green-500"
            />
            <DashboardCard
              href="/admin/customers"
              title="Manage Customers"
              description="View customer details and order history."
              icon={Users}
              stats="8 new customers this week"
              color="bg-purple-500"
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
