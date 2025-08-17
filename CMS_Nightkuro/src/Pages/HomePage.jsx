import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { BASE_URL } from "../constant/Constant";

const HomePage = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [dataProduct, setDataProduct] = useState([]);

  const fetchDataProduct = async () => {
    const { data } = await axios.get(`${BASE_URL}/product`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDataProduct(data.data);
  };

  useEffect(() => {
    fetchDataProduct();
  }, []);

  console.log("cek data", dataProduct);
  return (
    <>
      <main className="flex-1 px-8 pt-6 bg-slate-300 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Quick Access</h2>
        {/* <!-- Quick Access Grid --> */}
        <div className="grid grid-cols-4 gap-4 mb-8 pl-5">
          <Link
            to="/product"
            className="bg-white rounded-lg p-4 gap-2 shadow flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
          >
            <h2 className="hidden md:block text-sm font-bold text-gray-800">
              Product Management
            </h2>
            <i className="block md:hidden fa-solid fa-cubes text-slate-800 text-2xl"></i>
          </Link>
          <Link
            to="/category"
            className="bg-white rounded-lg p-4 gap-2 shadow flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
          >
            <h2 className="hidden md:block text-sm font-bold text-gray-800">
              Category Management
            </h2>
            <i className="block md:hidden fa-solid fa-tags text-slate-800 text-2xl"></i>
          </Link>
          {role === "Admin" && (
            <Link
              to="/addUser"
              className="bg-white rounded-lg p-4 gap-2 shadow flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
            >
              <h2 className="hidden md:block text-sm font-bold text-gray-800">
                Add User
              </h2>
              <i className="block md:hidden fa-solid fa-user-gear text-slate-800 text-2xl"></i>
            </Link>
          )}
        </div>

        <h2 className="text-xl font-bold mb-4">All Files</h2>
        {/* <!-- File List --> */}
        <div className="bg-white rounded-lg shadow overflow-hidden m-5">
          <table className="w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 text-center">Image</th>
                <th className="p-3 text-center">Name</th>
                <th className="p-3 text-center">Description</th>
                <th className="p-3 text-center">Stock</th>
                <th className="p-3 text-center">Price</th>
              </tr>
            </thead>
            <tbody>
              {dataProduct.map((el) => (
                <tr key={el.id} className="border-t">
                  <td className="flex justify-center items-center p-3 ">
                    <img
                      className="w-12 h-16 object-cover rounded-md"
                      src={el.imgUrl}
                      alt="Product"
                    />
                  </td>
                  <td className="p-3 text-center font-bold">{el.name}</td>
                  <td className="p-3">{el.description}</td>
                  <td className="p-3 text-center">{el.stock}</td>
                  <td className="p-3 text-center">
                    {" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(el.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default HomePage;
