import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import AuthContext from "./store/auth-context";
import Admin from "./pages/Admin/Admin";
import Waiter from "./pages/Waiter/WaiterHomepage";
import Chef from "./pages/Chef/ChefHomepage";
import Cashier from "./pages/Cashier/CashierHomepage";
import NavBar from "./components/Layout/NavBar";

const App = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = true;

  const isAdmin = false;
  const isWaiter = false;
  const isChef = false;
  const isCashier = true;

  const navTo = (comp) => {
    return isLoggedIn ? comp : <Navigate to="/login" />;
  };

  return (
    <>
      <NavBar />
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
