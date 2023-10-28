import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { PuffLoader } from "react-spinners";

const Login: React.FC = () => {
  const store = useUserStore();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      nim: store.nimLogin,
      password: store.passwordLogin,
    };
    try {
      const response = await fetch("https://ppl2.onrender.com/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        const token = responseData.data.token;
        store.updateUserToken(token);
        navigate("/api");
        setLoading(false);
      } else {
        setError(responseData?.msg);
        setLoading(false);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat melakukan sign in:", error);
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        loading ? "h-screen" : ""
      } text-xs flex justify-center flex-col items-center gap-[100px]`}
    >
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
        <p className="text-red-500 text-center text-xs lg:text-sm">{error}</p>
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
