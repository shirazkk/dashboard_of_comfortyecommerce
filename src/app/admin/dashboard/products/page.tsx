"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProtectedRoute from "@/components/protectedRoute";
import client from "@/sanity/lib/client";
import { ListChecks, ShoppingBag } from "lucide-react";
import { toast } from "react-hot-toast";

interface ProductsType {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount: number;
  badge?: string;
  imageUrl: string;
  category: {
    _id: string;
    title: string;
  };
  inventory: number;
  tags: string[];
}

export default function Products() {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);

    client
      .fetch(
        `*[_type == "products"] {
          _id,
          title,
          price,
          priceWithoutDiscount,
          badge,
          "imageUrl": image.asset->url,
          category->{
            _id,
            title
          },
          inventory,
          tags
        }`
      )
      .then((data: ProductsType[]) => {
        setProducts(data);

        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(data.map((product) => product.category.title)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category.title === selectedCategory
        );

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <div className="flex">
          {/* Sidebar */}
          <div className="hidden lg:flex flex-col w-64  h-screen fixed border-r">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800">Products</h1>
            </div>
            <nav className="flex-1 p-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full mb-2 flex items-center p-3 rounded-lg transition-all ${
                    selectedCategory === category
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {category === "All" ? (
                    <ShoppingBag className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ListChecks className="w-5 h-5 text-gray-500" />
                  )}
                  <span className="ml-3 font-medium">{category}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:ml-64">
            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center h-96">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mt-24">
                  {filteredProducts.map((product) => (
                    <div
                      key={product._id}
                      className="p-4 border rounded-lg shadow-sm bg-white"
                    >
                      <div className="flex flex-col justify-center items-center text-center">
                        <div className="hover:scale-105 duration-300 ease-in-out cursor-pointer relative flex justify-center items-center w-64 h-64 rounded-lg">
                          <Image
                            src={product.imageUrl}
                            alt={product.title}
                            width={160}
                            height={160}
                            quality={100}
                            loading="lazy"
                            className="w-full h-full rounded-lg"
                          />
                          {product.badge && (
                            <div className="py-2 px-3 absolute top-2 left-0">
                              <p
                                className={`${
                                  product.badge === "New"
                                    ? "bg-green-500"
                                    : product.badge === "Sales"
                                      ? "bg-orange-500"
                                      : "bg-gray-400"
                                } rounded-md px-3 py-1 text-white`}
                              >
                                {product.badge}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="w-full flex justify-between items-center">
                          <div>
                            <h2 className="text-left hover:text-blue-500 text-black text-base font-medium mt-4">
                              {product.title}
                            </h2>
                            <div className="flex gap-1 items-center">
                              <p className="text-lg text-green-600 font-medium mt-2">
                                ${product.price}
                              </p>
                              {product.priceWithoutDiscount && (
                                <p className="text-gray-500 line-through mt-2">
                                  ${product.priceWithoutDiscount}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
