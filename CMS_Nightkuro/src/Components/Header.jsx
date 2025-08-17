import { Link } from "react-router";

const Header = ({ username, role }) => {
  return (
    <>
      <header className="flex justify-between items-center p-4 bg-slate-300 shadow-xl/70">
        <section className="flex justify-center items-center pl-2">
          <img
            className="h-12 w-12"
            src="https://res.cloudinary.com/drzqzizv1/image/upload/v1755195051/NightKuro_xvhlbo.png"
          />
          <div>
            <h2 className="font-extrabold text-blue-950 text-xl ">NightKuro</h2>
            <hr />
            <span className="text-sm">Content Management System</span>
          </div>
        </section>
        <nav className="flex justify-center items-center gap-2 pr-8">
          <div className="py-1 px-5 flex justify-center items-center gap-2 border-2 border-blue-950/10 rounded-md">
            <div className="flex flex-col items-center">
              <span className="text-blue-950 font-bold">{username}</span>
              <span className="text-xs">{role}</span>
            </div>
            <img
              className="w-8 h-8 rounded-full text-white object-cover"
              src="https://i.pinimg.com/1200x/d7/4b/6e/d74b6e3e4aece622de3f1e1da00536e2.jpg"
              alt="PP"
            />
          </div>
          <Link
            to="/login"
            className="text-blue-950 text-2xl fa-solid fa-right-from-bracket hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
            onClick={() => {
              localStorage.clear();
            }}
          ></Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
