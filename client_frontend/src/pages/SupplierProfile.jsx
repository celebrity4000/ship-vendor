import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { getData, postData, deleteData } from "../global/server"; // Assume these are API fetch functions
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai";

const SupplierProfile = () => {
  const userId = useSelector((state) => state.auth.user._id);
  const [supplierData, setSupplierData] = useState(null);
  const [products, setProducts] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    currency: "INR", // Default currency
    label: "",
    image: null,
    industry: "", // Add industry field to the product object
  });
  const token = useSelector((state) => state.auth.token);

  // List of popular currencies
  const currencyOptions = [
    "USD",
    "EUR",
    "INR",
    "GBP",
    "JPY",
    "AUD",
    "CAD",
    "CNY",
    "CHF",
  ];

  // Fetch supplier data and products
  useEffect(() => {
    const fetchSupplierData = async () => {
      const supplierId = userId; // Get supplier ID from Redux state

      if (supplierId && token) {
        try {
          const response = await getData(`/supplier/${supplierId}`, token);
          setSupplierData(response.userData);

          // Set the industry/category for the new product based on supplier's industry
          setNewProduct((prev) => ({
            ...prev,
            industry: response.userData.industry,
          }));

          fetchProducts(supplierId);
        } catch (error) {
          console.error("Error fetching supplier data:", error);
        }
      }
    };

    fetchSupplierData();
  }, [token]);

  const fetchProducts = async (supplierId) => {
    try {
      const response = await getData(`/product/supplier/${supplierId}`, token);
      setProducts(response.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle product form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  // Add a new product
  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("industry", newProduct.industry); // Use the supplier's industry
    formData.append("price", newProduct.price);
    formData.append("currency", newProduct.currency); // Add currency to form data
    formData.append("label", newProduct.label);
    formData.append("supplier", userId); // Pass the supplier ID
    if (newProduct.image) {
      formData.append("file", newProduct.image); // Append image file
    }

    try {
      const response = await postData("/product", formData, token);
      setProducts([...products, response.product]);
      setShowAddProductModal(false);
      // Reset the form
      setNewProduct({
        name: "",
        price: "",
        currency: "INR",
        label: "",
        image: null,
        industry: supplierData.industry, // Reset to the supplier's industry
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Delete a product by ID
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteData(`/product/${productId}`, token);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-4 lg:px-20 py-10">
        {/* Supplier Information */}
        {supplierData && (
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10">
            <div>
              <h1 className="text-2xl font-semibold mb-2">
                {supplierData.companyName}
              </h1>
              <p>{supplierData.industry}</p>
              <p>{supplierData.phoneNumber}</p>
              <p>{supplierData.email}</p>
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded flex items-center mt-4 lg:mt-0"
              onClick={() => setShowAddProductModal(true)}
            >
              <AiOutlinePlus className="mr-2" /> Add Product
            </button>
          </div>
        )}

        {/* Products Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="relative">
                  <ProductCard product={product} />
                  <button
                    className="absolute bottom-2 right-2 bg-red-500 text-white rounded-full p-2"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              ))
            ) : (
              <p>No products available. Add a new product.</p>
            )}
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-xl w-full relative">
            <button
              className="absolute top-2 right-2 text-2xl font-bold text-gray-800"
              onClick={() => setShowAddProductModal(false)}
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">Add New Product</h3>
            <div className="grid gap-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={newProduct.price}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
              <select
                name="currency"
                value={newProduct.currency}
                onChange={handleInputChange}
                className="border p-2 rounded"
              >
                {currencyOptions.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="label"
                placeholder="Label"
                value={newProduct.label}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
              <input
                type="file"
                name="image"
                onChange={handleImageUpload}
                className="border p-2 rounded"
              />
              <button
                onClick={handleAddProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="h-[20vh]"></div>
      <Footer />
    </div>
  );
};

export default SupplierProfile;
