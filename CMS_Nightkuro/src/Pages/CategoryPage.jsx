import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constant/Constant";
import { Link } from "react-router";

const CategoryPage = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [category, setCategory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const fetchDataCategory = async () => {
    const { data } = await axios.get(`${BASE_URL}/category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCategory(data.data);
  };

  const handleAddCategory = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/category`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setName("");
      setIsOpen(false);
      fetchDataCategory();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCategory = async (id) => {
    await axios.delete(`${BASE_URL}/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchDataCategory();
  };

  useEffect(() => {
    fetchDataCategory();
  }, []);

  return (
    <main className="flex-1 p-10 bg-slate-300 overflow-y-auto">
      <div className="flex gap-1">
        <Link
          to="/"
          className="font-semibold hover:underline hover:text-sky-700 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
        >
          Home
        </Link>
        <h1 className="font-semibold"> &gt; Category Management </h1>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-950 hover:bg-blue-900 text-white font-semibold px-4 py-2 rounded-lg shadow hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
        >
          + Add Category
        </button>
      </div>
      <hr />
      <div className="flex flex-wrap gap-3 p-5">
        {category.map((el) => (
          <div
            key={el.id}
            className="flex items-center gap-3 cursor-pointer bg-blue-950 px-4 py-2 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-white text-blue-950">
              <i className="fa-solid fa-shirt text-sm"></i>
            </div>
            <span className="text-white font-medium">{el.name}</span>
            {role === "Admin" && (
              <button
                type="button"
                onClick={() => handleDeleteCategory(el.id)}
                className="ml-2 text-white hover:text-red-500 font-bold cursor-pointer  transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Category Name"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 font-semibold rounded-lg border hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-950 hover:bg-blue-900 text-white font-semibold px-4 py-2 rounded-lg"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default CategoryPage;
