import { Button } from "@/components/ui/button";

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { getData, deleteData } from "../global/server";
import { logout } from "@/redux/authSlice";
import SideNavbar from "@/components/SideNavbar";

export default function Product() {
  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null); // Store selected product for modal
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // Ensure user is authenticated
  useEffect(() => {
    if (!auth.token) {
      navigate("/"); // Redirect to login if token is missing
    } else {
      getProducts();
    }
  }, [auth.token, location]);

  const getProducts = async () => {
    if (!auth.token) return;
    try {
      const response = await getData("/api/product", auth.token);
      setProducts(response?.products || []);
    } catch (err: any) {
      console.log("Error fetching products:", err);
      if (err.response && err.response.status === 401) {
        dispatch(logout());
        navigate("/");
      }
    }
  };

  const handleDelete = async (productId: string) => {
    if (!auth.token) return;
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await deleteData(`/api/product/${productId}`, auth.token);
      getProducts(); // Refresh the product list
    } catch (err) {
      console.log("Error deleting product:", err);
    }
  };

  const handleViewMore = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <SideNavbar />
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" to="#">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1"></div>
          <Button
            onClick={() => {
              localStorage.removeItem("userId");
              localStorage.removeItem("authToken");
              dispatch(logout());
              navigate("/");
            }}
          >
            Logout
          </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card className="bg-primary">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-medium text-white">
                  Products
                </CardTitle>
                <Link
                  className="text-sm font-medium underline text-white"
                  to="#"
                >
                  View All
                </Link>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {products?.length}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="border shadow-sm rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Supplier Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((product: any) => (
                  <TableRow key={product?._id}>
                    <TableCell>{product?.name}</TableCell>
                    <TableCell>{product?.industry}</TableCell>
                    <TableCell>{product?.supplier?.companyName}</TableCell>
                    <TableCell>
                      {product?.price} {product?.currency}
                    </TableCell>
                    <TableCell>{product?.label}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          color="blue"
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewMore(product)}
                        >
                          View More
                        </Button>
                        <Button
                          color="red"
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>

      {/* Modal for Viewing More Info */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-md w-full">
            <button
              className="absolute top-2 right-2 text-2xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">Product Details</h3>
            <img
              src={selectedProduct?.image}
              alt={selectedProduct?.name}
              className="w-32 h-32 mb-4  object-cover mx-auto"
            />
            <p>
              <strong>Product Name: </strong>
              {selectedProduct?.name}
            </p>
            <p>
              <strong>Industry: </strong>
              {selectedProduct?.industry}
            </p>
            <p>
              <strong>Price: </strong>
              {selectedProduct?.price} {selectedProduct?.currency}
            </p>
            <p>
              <strong>Discount: </strong>
              {selectedProduct?.label}
            </p>
            <p>
              <strong>Supplier Name: </strong>
              {selectedProduct?.supplier?.firstName}{" "}
              {selectedProduct?.supplier?.lastName}
            </p>
            <img
              src={selectedProduct?.supplier?.userImg}
              alt={selectedProduct?.supplier?.firstName}
              className="w-16 h-16 mt-4 rounded-full object-cover "
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Icons (replace with your icon components)
function Package2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.5 9.4 7.55 4.24" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="M3.29 7 12 12.67 20.71 7" />
      <path d="M12 22.76V12.67" />
      <path d="m7.5 4.21 9 5.19" />
      <path d="M7.5 4.21v10.6L3 16" />
      <path d="M21 16l-4.5-1.18V9.4" />
    </svg>
  );
}

// function SearchIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="11" cy="11" r="8" />
//       <path d="m21 21-4.3-4.3" />
//     </svg>
//   );
// }
