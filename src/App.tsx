import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Daftar from "./Pages/Daftar";
import Login from "./Pages/Login";
import useUserStore from "./store/userStore";
import NotFound from "./Pages/NotFound";
import Layout from "./components/Layout";
import HitungAkar from "./Pages/HitungAkar";
import Dashboard from "./components/Dashboard";
import SemuaDataUSer from "./Pages/SemuaDataUser";
import TotalDataPerUser from "./Pages/TotalDataPerUser";
import WaktuProses from "./Pages/WaktuProses";

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
        <Route element={<Layout />}>
          <Route
            path="/api"
            element={
              <HitungAkar
                api="https://ppl2.onrender.com/calculated-api"
                metode="API"
              />
            }
          />
          <Route
            path="/plsql"
            element={
              <HitungAkar
                api="https://ppl2.onrender.com/calculated-plsql"
                metode="PL/SQL"
              />
            }
          />
        </Route>
        <Route element={<Dashboard />}>
          {/* Semua Data */}
          <Route
            path="/dashboard"
            element={
              <SemuaDataUSer
                api="https://ppl2.onrender.com/calculated-api"
                metode="API"
              />
            }
          />
          <Route
            path="/dashboard/plsql"
            element={
              <SemuaDataUSer
                api="https://ppl2.onrender.com/calculated-plsql"
                metode="PL/SQL"
              />
            }
          />

          {/* User Data */}
          <Route
            path="/dashboard/api/data-user"
            element={
              <SemuaDataUSer
                api="https://ppl2.onrender.com/user-calculated-api"
                metode="API"
              />
            }
          />
          <Route
            path="/dashboard/plsql/data-user"
            element={
              <SemuaDataUSer
                api="https://ppl2.onrender.com/user-calculated-plsql"
                metode="PL/SQL"
              />
            }
          />

          {/* Total Data Per User */}
          <Route
            path="/dashboard/api/total-data-per-user"
            element={
              <TotalDataPerUser apiPerUser="https://ppl2.onrender.com/calculated-api-user" />
            }
          />
          <Route
            path="/dashboard/plsql/total-data-per-user"
            element={
              <TotalDataPerUser apiPerUser="https://ppl2.onrender.com/calculated-plsql-user" />
            }
          />

          {/* Total Proses User */}
          <Route
            path="/dashboard/api/waktu-proses-per-user"
            element={
              <WaktuProses apiProses="https://ppl2.onrender.com/process-api" />
            }
          />
          <Route
            path="/dashboard/plsql/waktu-proses-per-user"
            element={
              <WaktuProses apiProses="https://ppl2.onrender.com/process-plsql" />
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
