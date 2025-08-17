import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { BASE_URL } from "../constant/Constant";
import { toast, ToastContainer } from "react-toastify";

const ProductPage = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const idUser = Number(localStorage.getItem("id"));

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

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success(`Product with id: ${id} success to delete`);
    fetchDataProduct();
  };

  return (
    <>
      <main className="flex-1 min-h-full overflow-y-auto p-6 bg-slate-300">
        <div className="flex gap-1">
          <Link
            to="/"
            className="font-semibold hover:underline hover:text-sky-700 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
          >
            Home
          </Link>
          <h1 className="font-semibold"> &gt; Product Management </h1>
        </div>
        <div className="flex items-center justify-between mb-6 ">
          <div>
            <h1 className="text-2xl font-bold">Product Management</h1>
            <h1 className="text-md font-semibold text-gray-950">
              Total Products:{" "}
              <span className="text-blue-900">{dataProduct.length}</span>
            </h1>
          </div>
          <Link
            to="/product/addProduct"
            className="bg-blue-950 hover:bg-blue-900 text-white font-semibold px-4 py-2 rounded-lg shadow hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
          >
            + Add Product
          </Link>
        </div>
        <hr />
        <div className="bg-white rounded-lg shadow overflow-hidden m-5">
          <table className="w-full border-collapse shadow-2xl">
            <thead>
              <tr className="bg-gray-200 text-left text-gray-700">
                <th className="p-3 text-center">ID</th>
                <th className="p-3 text-center">Image</th>
                <th className="p-3 text-center">Name</th>
                <th className="p-3 text-center">Description</th>
                <th className="p-3 text-center">Stock</th>
                <th className="p-3 text-center">Price</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {dataProduct.map((el) => (
                <tr key={el.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-bold text-center">{el.id}</td>
                  <td className="p-3">
                    <img
                      src={el.imgUrl}
                      alt="Product"
                      className="w-12 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3 font-semibold">{el.name}</td>
                  <td className="p-3 text-gray-600">{el.description}</td>
                  <td className="p-3">{el.stock}</td>
                  <td className="p-3">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(el.price)}
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <div className="flex justify-center gap-2">
                      {(role === "Admin" || el.AuthorId === idUser) && (
                        <Link
                          to={`/product/editProduct/${el.id}`}
                          className="bg-blue-900 content-center text-white text-sm font-semibold no-underline rounded-lg h-[1.875rem] max-w-[7.5rem] px-[0.625rem] flex items-center justify-center hover:bg-blue-800 fa-solid fa-pen"
                        ></Link>
                      )}
                      {(role === "Admin" || el.AuthorId === idUser) && (
                        <Link
                          className="bg-[#b30000] content-center text-white text-sm font-semibold no-underline rounded-lg h-[1.875rem] max-w-[7.5rem] px-[0.625rem] flex items-center justify-center hover:bg-red-800 fa-solid fa-trash"
                          onClick={() => handleDelete(el.id)}
                        ></Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default ProductPage;
