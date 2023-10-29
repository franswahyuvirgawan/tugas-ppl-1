import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { PuffLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Login: React.FC = () => {
  const store = useUserStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      nim: store.nimLogin,
      password: store.passwordLogin,
    };

    try {
      const response = await axios.post(
        "https://ppl2.onrender.com/auth/signin",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = response.data.data.token;
      store.updateUserToken(token);
      navigate("/api");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div
      className={`${
        loading ? "h-screen" : ""
      } text-xs flex justify-center flex-col items-center gap-[100px]`}
    >
      <Toaster position="top-center" reverseOrder={false} />
      {loading ? (
        <div className="w-full absolute flex flex-row items-center justify-center bg-[#1D232A] h-screen bg-opacity-90">
          <PuffLoader color="#fff" />
        </div>
      ) : (
        ""
      )}
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-[16px] h-screen justify-center items-center w-full md:w-[400px] px-[70px]"
      >
        <h1 className="lg:text-4xl text-2xl font-bold">Login Akun</h1>
        <input
          value={store.nimLogin}
          onChange={(e) => store.updateNimLogin(e.target.value)}
          type="text"
          placeholder="Masukkan NIM"
          className="input input-xs h-11 input-bordered lg:w-full w-full"
        />
        <input
          type="password"
          value={store.passwordLogin}
          onChange={(e) => store.updatePasswordLogin(e.target.value)}
          placeholder="Masukkan Password"
          className="input input-xs h-11 input-bordered lg:w-full w-full"
        />
        <button className="w-full btn btn-xs p-5 btn-primary flex flex-col items-center">
          Login
        </button>
        <p>
          Belum punya akun?{" "}
          <Link className="text-blue-500 underline" to="/">
            Daftar
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
