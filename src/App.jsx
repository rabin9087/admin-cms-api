import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignUp from "./pages/sign-in-up/SignUp";
import SignIn from "./pages/sign-in-up/SignIn";

function App() {
  return (
    <div>
      <Routes>
        {/* public route */}
        <Route path="/" element={<SignIn />}></Route>

        {/* private route */}
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
