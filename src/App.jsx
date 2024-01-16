import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignUp from "./pages/sign-in-up/SignUp";
import SignIn from "./pages/sign-in-up/SignIn";
import VerifyEmail from "./pages/sign-in-up/VerifyEmail";
import Dashboard from "./pages/dashboard/Dashboard";
import Category from "./pages/category/Category";
import Product from "./pages/product/Product";
import PaymentOption from "./pages/payment-option/PaymentOption";
import Order from "./pages/order/Order";
import Customer from "./pages/customer/Customer";
import AdminUser from "./pages/admin-user/AdminUser";
import MyProfile from "./pages/myProfile/MyProfile";
import PrivateRouter from "./components/private-router/PrivateRouter";
import ResetPassword from "./pages/sign-in-up/ResetPassword";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllCategoriesAction } from "./pages/category/categoryAction";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCategoriesAction())
  }, [dispatch])
  return (
    <div>
      <Routes>
        {/* public route */}
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/verify-email" element={<VerifyEmail />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>

        {/* private route */}
        <Route
          path="/admin-signup"
          element={
            <PrivateRouter>
              <SignUp />
            </PrivateRouter>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <PrivateRouter>
              <Dashboard />
            </PrivateRouter>
          }
        ></Route>

        <Route
          path="/category"
          element={
            <PrivateRouter>
              <Category />
            </PrivateRouter>
          }
        ></Route>
        <Route
          path="/product"
          element={
            <PrivateRouter>
              <Product />
            </PrivateRouter>
          }
        ></Route>
        <Route
          path="/payment-option"
          element={
            <PrivateRouter>
              <PaymentOption />
            </PrivateRouter>
          }
        ></Route>
        <Route
          path="/order"
          element={
            <PrivateRouter>
              <Order />
            </PrivateRouter>
          }
        ></Route>
        <Route
          path="/customer"
          element={
            <PrivateRouter>
              <Customer />
            </PrivateRouter>
          }
        ></Route>
        <Route
          path="/admin-user"
          element={
            <PrivateRouter>
              <AdminUser />
            </PrivateRouter>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <PrivateRouter>
              <MyProfile />
            </PrivateRouter>
          }
        ></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
