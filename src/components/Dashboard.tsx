import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <div className="w-full flex flex-row justify-between px-[40px] navbar bg-base-100 sticky top-0 z-40 py-4 lg:hidden">
          <label
            htmlFor="my-drawer-2"
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
          <Link to="/" className="btn btn-ghost normal-case text-lg">
            Kelompok 22
          </Link>
        </div>
        <div className="py-20">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 lg:w-60 w-80 min-h-full bg-base-200 text-base-content flex flex-col gap-4 py-10 items-start">
          {/* Sidebar content here */}
          <li>
            <Link to="" className="btn btn-ghost normal-case text-lg w-full">
              Kelompok 22
            </Link>
          </li>
          <li className="w-full" tabIndex={0}>
            <details>
              <summary>Log API</summary>
              <ul className="p-2 flex flex-col gap-2">
                <li>
                  <Link to="/dashboard">Semua data user</Link>
                </li>
                <li>
                  <Link to="/dashboard/api/data-user">Data user</Link>
                </li>
                <li>
                  <Link to="/dashboard/api/total-data-per-user">
                    Total data per user
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/api/waktu-proses-per-user">
                    Waktu proses
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li className="w-full" tabIndex={0}>
            <details>
              <summary>Log PL/SQL</summary>
              <ul className="p-2 flex flex-col gap-2">
                <li>
                  <Link to="/dashboard/plsql">Semua data user</Link>
                </li>
                <li>
                  <Link to="/dashboard/plsql/data-user">Data user</Link>
                </li>
                <li>
                  <Link to="/dashboard/plsql/total-data-per-user">
                    Total data per user
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/plsql/waktu-proses-per-user">
                    Waktu proses
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
