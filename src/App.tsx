import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Template from "./Pages/Template";
import Daftar from "./Pages/Daftar";
import Login from "./Pages/Login";
import useUserStore from "./store/userStore";

function App() {
  const store = useUserStore();

  const PrivateRoutes = () => {
    let auth = store.userToken;
    return auth ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={store.userToken ? <Navigate to="/api" /> : <Daftar />}
      />
      <Route
        path="/login"
        element={store.userToken ? <Navigate to="/api" /> : <Login />}
      />
      <Route element={<PrivateRoutes />}>
        <Route
          path="/plsql"
          element={
            <Template
              api="https://ppl2.onrender.com/calculated-plsql"
              metode="PL/SQL"
            />
          }
        />
        <Route
          path="/api"
          element={
            <Template
              api="https://ppl2.onrender.com/calculated-api"
              metode="API"
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
