import "./firebase/firebase-config";
import { useEffect, useState } from "react";
import Form from "./components/common/Form";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  login,
  refreshState,
  register
} from "./features/auth/authSlice";
import Layout from './components/common/Layout'
import Cart from "./pages/Cart";

type FormType = "login" | "register";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  let dispatch = useAppDispatch();
  let accessToken = useAppSelector(state => state.auth.accessToken);
  let error = useAppSelector(state => state.auth.error);
  const handleAction = (formType: FormType) => {
    if (formType === "register") dispatch(register({ email, password }));
    if (formType === "login") dispatch(login({ email, password }));
    setEmail("");
    setPassword("");
  };
  useEffect(() => {
    if (accessToken) {
      navigate("/home");
    }
  }, [accessToken]);
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(refreshState())
    }
  }, [error]);

  
  return (
    <Layout>
      <ToastContainer />
      <>
        <Routes>
          <Route
            path="/login"
            element={
              <Form
                title="Login"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction("login")}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Form
                title="Register"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction("register")}
              />
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Home />} />
          <Route path="/product/category/:category" element={<Home />} />
        </Routes>
      </>
    </Layout>
  );
}

export default App;
