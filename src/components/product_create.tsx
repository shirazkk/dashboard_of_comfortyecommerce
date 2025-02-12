// "use client";

// import React, { useState } from "react";
// import { toast } from "react-hot-toast";
// import client from "@/sanity/lib/client";

// const Product_Create = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     price: "",
//     priceWithoutDiscount: "",
//     badge: "",
//     category: "",
//     inventory: "",
//     tags: "",
//   });

//   const [image, setImage] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   // Handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle image selection
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       let imageAsset = null;

//       // Upload the image to Sanity
//       if (image) {
//         const uploadResult = await client.assets.upload("image", image);
//         imageAsset = uploadResult._id;
//       }

//       const newProduct = {
//         _type: "products",
//         title: formData.title,
//         price: parseFloat(formData.price),
//         priceWithoutDiscount: parseFloat(formData.priceWithoutDiscount),
//         badge: formData.badge || null,
//         image: imageAsset
//           ? {
//               _type: "image",
//               asset: {
//                 _type: "reference",
//                 _ref: imageAsset,
//               },
//             }
//           : null,
//         category: {
//           _type: "reference",
//           _ref: formData.category,
//         },
//         inventory: parseInt(formData.inventory),
//         tags: formData.tags.split(",").map((tag) => tag.trim()),
//       };

//       await client.create(newProduct);
//       toast.success("Product added successfully!");
//       setFormData({
//         title: "",
//         price: "",
//         priceWithoutDiscount: "",
//         badge: "",
//         category: "",
//         inventory: "",
//         tags: "",
//       });
//       setImage(null);
//     } catch (error) {
//       console.error("Error adding product:", error);
//       toast.error("Failed to add product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Product</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Title */}
//         <input
//           type="text"
//           name="title"
//           placeholder="Product Title"
//           value={formData.title}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded"
//           required
//         />

//         {/* Price */}
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded"
//           required
//         />

//         {/* Price Without Discount */}
//         <input
//           type="number"
//           name="priceWithoutDiscount"
//           placeholder="Price Without Discount"
//           value={formData.priceWithoutDiscount}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded"
//         />

//         {/* Badge */}
//         <select name="badge" value={formData.badge} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
//           <option value="">Select Badge</option>
//           <option value="New">New</option>
//           <option value="Sale">Sale</option>
//         </select>

//         {/* Image Upload */}
//         <div>
//           <label className="block font-medium">Upload Image</label>
//           <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border border-gray-300 rounded" />
//         </div>

//         {/* Category ID */}
//         <input
//           type="text"
//           name="category"
//           placeholder="Category ID"
//           value={formData.category}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded"
//           required
//         />

//         {/* Inventory */}
//         <input
//           type="number"
//           name="inventory"
//           placeholder="Inventory"
//           value={formData.inventory}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded"
//           required
//         />

//         {/* Tags */}
//         <input
//           type="text"
//           name="tags"
//           placeholder="Tags (comma-separated)"
//           value={formData.tags}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded"
//         />

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
//           disabled={loading}
//         >
//           {loading ? "Adding..." : "Add Product"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Product_Create;
