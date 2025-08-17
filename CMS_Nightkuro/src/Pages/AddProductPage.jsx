import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constant/Constant";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router";
import FormProduct from "../Components/FormProduct";

const AddProductPage = () => {
  const navigate = useNavigate();
  const action = "Add";
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    CategoryId: "",
  });
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");
  const [category, setCategory] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);

  console.log(errorMessage, "Cek Error");

  const fetchDataCategory = async () => {
    const { data } = await axios.get(`${BASE_URL}/category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCategory(data.data);
  };

  useEffect(() => {
    fetchDataCategory();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setImage(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/product`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        await axios.patch(
          `${BASE_URL}/product/${data.data.id}/uploadImg`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Success Create new Product");
        navigate("/product");
      }
      toast.success("Success Create new Product");
      navigate("/product");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <main className="flex flex-col min-h-full w-full overflow-y-auto p-6 bg-slate-300">
        <div className="self-start flex gap-1 ">
          <Link
            to="/"
            className="font-semibold hover:underline hover:text-sky-700 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
          >
            Home
          </Link>
          <h1 className="font-semibold"> &gt; </h1>
          <Link
            to="/product"
            className="font-semibold hover:underline hover:text-sky-700 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
          >
            {" "}
            Product Management
          </Link>{" "}
          <h1 className="font-semibold"> &gt; Add Product</h1>
        </div>
        <FormProduct
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleRemoveImage={handleRemoveImage}
          handleFileChange={handleFileChange}
          formData={formData}
          errorMessage={errorMessage}
          category={category}
          image={image}
          action={action}
        />
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

export default AddProductPage;
