import { Link } from "react-router";

const SideBar = ({ role }) => {
  return (
    <div className="flex flex-col min-w-2/12 bg-slate-800 p-8 gap-10 rounded-tr-[3rem]">
      <Link
        to="/"
        className="flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
      >
        <i className="text-white fa-solid fa-chart-line text-lg leading-none"></i>
        <h2 className="text-white hidden sm:block text-sm font-semibold mb-0 leading-none">
          Dashboard
        </h2>
      </Link>
      <Link
        to="/product"
        className="flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
      >
        <i className="text-white fa-solid fa-cubes text-lg leading-none"></i>
        <h2 className="text-white hidden sm:block text-sm font-semibold mb-0 leading-none">
          Product Management
        </h2>
      </Link>
      <Link
        to="/category"
        className="flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
      >
        <i className="text-white fa-solid fa-tags text-lg leading-none"></i>
        <h2 className="text-white hidden sm:block text-sm font-semibold mb-0 leading-none">
          Category Management
        </h2>
      </Link>
      {role === "Admin" && (
        <Link
          to="/addUser"
          className="flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
        >
          <i className="text-white fa-solid fa-user-gear text-lg leading-none"></i>
          <h2 className="text-white hidden sm:block text-sm font-semibold mb-0 leading-none">
            Add User
          </h2>
        </Link>
      )}
    </div>
  );
};

export default SideBar;
