import { Outlet, useNavigate } from "react-router";
import Header from "../Components/Header";
import SideBar from "../Components/SideBar";
import { useEffect } from "react";

const ProtactionLayout = () => {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  return (
    <>
      <section className="flex flex-col h-screen">
        <Header username={username} role={role} />
        <div className="flex flex-1 overflow-hidden bg-slate-300 ">
          <SideBar role={role} />
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default ProtactionLayout;
