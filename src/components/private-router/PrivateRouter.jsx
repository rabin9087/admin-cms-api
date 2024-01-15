import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRouter = ({ children }) => {
  const location = useLocation();
  const { admin } = useSelector((state) => state.userInfo);
  return admin?.role === "admin" ? (
    children
  ) : (
    <Navigate
      to={"/"}
      state={{
        from: { location },
      }}
    />
  );
};

export default PrivateRouter;
