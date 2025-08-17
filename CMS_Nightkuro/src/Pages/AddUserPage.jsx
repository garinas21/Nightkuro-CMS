import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../constant/Constant";

const AddUserPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const [errorMessage, setErrorMessage] = useState([]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${BASE_URL}/add-user`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Success Create new Product");
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <>
      <main className="flex flex-col min-h-full w-8/10  overflow-y-auto p-6 bg-slate-300">
        <div className="self-start flex gap-1 ">
          <Link
            to="/"
            className="font-semibold hover:underline hover:text-sky-700 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
          >
            Home
          </Link>
          <h1 className="font-semibold"> &gt; Add User</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="self-center flex flex-col w-4/10 p-5 bg-white rounded-2xl shadow-xl mt-5"
        >
          <h1 className="text-2xl font-bold text-center text-blue-950 mb-3">
            Add User
          </h1>
          <hr />
          <label className="block mb-1 font-semibold mt-5">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <label className="block mb-1 font-semibold mt-5">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errorMessage?.email && (
            <p className="font-semibold text-red-600 mb-2">
              {errorMessage?.email}
            </p>
          )}
          <label className="block mb-1 font-semibold mt-5">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errorMessage?.password && (
            <p className="font-semibold text-red-600 mb-2">
              {errorMessage?.password}
            </p>
          )}
          <label className="block mb-1 font-semibold mt-5">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <label className="block mb-1 font-semibold mt-5">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="self-center w-2/5 mt-5 bg-blue-950 text-white py-2 rounded-lg font-semibold hover:bg-blue-900 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
          >
            Add User
          </button>
        </form>
        <ToastContainer
          position="bottom-right"
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
      </main>
    </>
  );
};

export default AddUserPage;
