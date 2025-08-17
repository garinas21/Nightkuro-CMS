import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BASE_URL } from "../constant/Constant";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  const formSubmit = async (event) => {
    try {
      event.preventDefault();

      const { data } = await axios.post(`${BASE_URL}/login`, {
        identity,
        password,
      });

      console.log(data);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("id", data.data.id);
      localStorage.setItem("username", data.data.username);
      localStorage.setItem("role", data.data.role);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(`${error.response.status} ${error.response.data.message}`);
    }
  };
  return (
    <>
      <section className="flex justify-between h-screen bg-slate-300/90 ">
        <img
          className="h-screen w-0 md:w-3/5 object-cover mask-r-from-50% mask-r-to-100%"
          src="https://i.pinimg.com/1200x/3c/1b/9f/3c1b9fd602050964cafa1539f509a671.jpg"
        />
        <div className="flex justify-center items-center h-screen w-11/12 md:w-2/5">
          <div
            className="flex flex-col items-center justify-center w-4/5 h-5/6 
                bg-gradient-to-r from-gray-500/20 to-gray-500/40 border border-white/50 
                backdrop-blur-lg rounded-2xl shadow-2xl p-10"
          >
            <p className="font-bold text-3xl text-blue-950 tracking-widest underline">
              NightKuro
            </p>
            <span className="text-sm">Content Management System</span>
            <form
              className="flex flex-col items-center gap-5 w-full max-w-sm mt-10"
              onSubmit={formSubmit}
            >
              <input
                className="w-full bg-gray-300 text-blue-950 placeholder-blue-950/40 p-3 rounded-lg"
                placeholder="Email or Username"
                value={identity}
                onChange={(event) => setIdentity(event.target.value)}
                type="identity"
              />
              <input
                className="w-full bg-gray-300 text-blue-950 placeholder-blue-950/40 p-3 rounded-lg"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
              />
              <button
                type="submit"
                className="w-2/3 cursor-pointer font-bold bg-blue-800 text-white py-3 rounded-lg shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <ToastContainer
          position="bottom-left"
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
      </section>
    </>
  );
};

export default LoginPage;
