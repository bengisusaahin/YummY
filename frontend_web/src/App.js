import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import AuthContext from "./store/auth-context";
import Admin from "./pages/Admin/Admin";
import Waiter from "./pages/Waiter/WaiterHomepage";
import Chef from "./pages/Chef/ChefHomepage";
import Cashier from "./pages/Cashier/CahshierHomepage";

const App = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = true;

  const isAdmin = false;
  const isWaiter = true;
  const isChef = false;
  const isCashier = false;

  const navTo = (comp) => {
    return isLoggedIn ? comp : <Navigate to="/login" />;
  };

  return (
    <>
      <div style={{ overflowY: "auto", height: "100vh" }}>
        <Routes>
          {!isLoggedIn && <Route path="login" element={<Login />} />}
          {/* ----------------------------- */}

          {isAdmin && (
            <>
              <Route path="/" element={navTo(<Admin />)} />
            </>
          )}
          {isWaiter && (
            <>
              <Route path="/" element={navTo(<Waiter />)} />
            </>
          )}
          {isChef && (
            <>
              <Route path="/" element={navTo(<Chef />)} />
            </>
          )}
          {isCashier && (
            <>
              <Route path="/" element={navTo(<Cashier />)} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
};

export default App;