import CustomInput from "../../components/customs/CustomInput";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { postSignIn } from "../../helpers/axiosHelper/users/userAxios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { autoLogin, getUserProfile } from "../profile/userAction";
import Screenshare from "../category/Screenshare";
const SignIn = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fromLocation =
    location?.state?.from?.location?.pathname || "/dashboard";
  const { admin } = useSelector((state) => state.userInfo);

  useEffect(() => {
    // check if user in redux store, if so, redirect to dashboard
    admin?._id && navigate(fromLocation);
    dispatch(autoLogin());
  }, [admin?._id, navigate, dispatch, fromLocation]);

  //get email and passeword from the form using uncontrolled input field

  const handelOnSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email && password) {
      const resPending = postSignIn({ email, password });

      toast.promise(resPending, {
        pending: "Please wait ...",
      });

      const { status, message, jwts } = await resPending;
      toast[status](message);
      if (jwts?.accessJWT) {
        sessionStorage.setItem("accessJWT", jwts.accessJWT);
        localStorage.setItem("refreshJWT", jwts.refreshJWT);
        dispatch(getUserProfile());
      }
    }
  };

  const input = [
    {
      label: "Email",
      name: "email",
      required: true,
      placeholder: "Enter email address",
      forwardRef: emailRef,
    },

    {
      label: "Password",
      name: "password",
      type: "password",
      required: true,
      placeholder: "Enter password",
      forwardRef: passwordRef,
    },
  ];
  return (
    <div>
      <div className="mt-5 text-center ">
        <h1> Tech Gear Admin CMS</h1>
      </div>
      <hr />
      <Form
        className="m-auto border rounded shadow-lg p-3 mt-5"
        style={{ width: "500px" }}
        onSubmit={handelOnSubmit}
      >
        <h3>Admin signIn only</h3>
        <hr />
        {input.map((item, i) => (
          <CustomInput key={i} {...item} />
        ))}

        <div className="d-grid">
          <Button type="submit">Sign In</Button>
        </div>

        <div className="mt-4 text-end">
          <a href="/reset-password"> Forget Password?</a>
        </div>
      </Form>
      {/* <Screenshare/> */}
    </div>
  );
};

export default SignIn;
