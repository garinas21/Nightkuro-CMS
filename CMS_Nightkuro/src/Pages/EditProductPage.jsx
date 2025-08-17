import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../constant/Constant";
import FormProduct from "../Components/FormProduct";

const EditProductPage = () => {
  const { id } = useParams();
  const action = "Edit";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    CategoryId: "",
  });
  const [image, setImage] = useState(null);
  const [authorId, setAuthorId] = useState(0);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const idUser = Number(localStorage.getItem("id"));

  const [category, setCategory] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
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

  const fetchDataProductId = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({
        name: data.data.name,
        description: data.data.description,
        price: data.data.price,
        stock: data.data.stock,
        CategoryId: data.data.CategoryId,
      });
      setImgUrl(data.data.imgUrl);
      setAuthorId(data.data.AuthorId);
    } catch (error) {
      console.error(error);
      toast.error("Product not found");
      navigate("/product");
    }
  };

  useEffect(() => {
    fetchDataCategory();
  }, []);

  useEffect(() => {
    const checkAccess = async () => {
      await fetchDataProductId();
    };
    checkAccess();
  }, [id, token]);

  useEffect(() => {
    if (role !== "Admin" && idUser !== authorId && authorId !== 0) {
      navigate("/product");
    }
  }, [role, idUser, authorId, navigate]);

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
    setImgUrl(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.put(`${BASE_URL}/product/${id}`, formData, {
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
          <h1 className="font-semibold"> &gt; Edit Product</h1>
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
          imgUrl={imgUrl}
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

export default EditProductPage;
