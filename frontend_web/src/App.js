import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import AuthContext from "./store/auth-context";
import UserContext from "./store/user-context";
import Admin from "./pages/Admin/Admin";

const App = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = true;

  const userCtx = useContext(UserContext);
  const isManager = userCtx.isManager;

  const navTo = (comp) => {
    return isLoggedIn ? comp : <Navigate to="/login" />;
  };

  return (
    <>
      <div style={{ overflowY: "auto", height: "100vh" }}>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          {!isLoggedIn && <Route path="login" element={<Login />} />}
          {/* ----------------------------- */}
          {isManager && (
            <>
              <Route path="/" element={navTo(<Admin />)} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
};

export default App;
