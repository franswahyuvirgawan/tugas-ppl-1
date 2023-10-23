import { Route, Routes } from "react-router-dom";
import Template from "./Template";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Template
            api="https://ppl2.onrender.com/calculated-api"
            metode="API"
          />
        }
      />
      <Route
        path="/plsql"
        element={
          <Template
            api="https://ppl2.onrender.com/calculated-plsql"
            metode="PL/SQL"
          />
        }
      />
    </Routes>
  );
}

export default App;
