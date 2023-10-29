import React from "react";
import { Link, Outlet } from "react-router-dom";
import useUserStore from "../store/userStore";

const Layout: React.FC = () => {
  const store = useUserStore();
  const handleLogout = () => {
    store.updateNewNim("");
    store.updatenewPassword("");
    store.updateUserToken("");
  };
  return (
    <>
      <div className="navbar bg-base-300 sticky top-0 z-40 py-4 md:px-[80px] px-[32px] w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
        <div className="navbar-start w-full lg:w-[50%] flex flex-row justify-between lg:block">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-primary drawer-button lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 flex flex-col items-start gap-4"
            >
              <li>
                <Link to="/">Hitung Akar</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button
                  className="btn btn-xs p-5 btn-outline btn-error flex flex-col items-center lg:btn-base text-xs"
                  onClick={handleLogout}
                >
                  Keluar
                </button>
              </li>
            </ul>
          </div>
          <Link to="/api" className="btn btn-ghost normal-case text-lg">
            Kelompok 22
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex flex-row items-center gap-4">
            <li>
              <Link to="/">Hitung Akar</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button
                className="btn btn-xs p-5 btn-outline btn-error flex flex-col items-center lg:btn-base"
                onClick={handleLogout}
              >
                Keluar
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="md:px-[80px] px-[32px] text-xs flex justify-center flex-col items-center gap-[100px] py-[40px]">
        <Outlet />
      </div>
      <footer className="footer footer-center p-4 bg-primary text-base-content text-xs lg:text-sm md:px-[80px] px-[32px]">
        <aside>
          <p>Copyright © 2023 - Kelompok 22 as the owner and creator.</p>
        </aside>
      </footer>
    </>
  );
};

export default Layout;
