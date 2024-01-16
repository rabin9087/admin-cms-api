import CustomInput from "../../components/customs/CustomInput";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { requestOTP, requestPassword } from "../../helpers/axiosHelper/users/userAxios";
import { useNavigate } from "react-router-dom";

const initialState = {
  opt: "",
  password: "",
  confirmPassword: ""
}

const ResetPassword = () => {
  const emailRef = useRef("");
  const navigate = useNavigate()

  const [showOTP, setShowOTP] = useState(true);
  const [response, setResponse] = useState({});

  const [form, setForm] = useState(initialState)

  //get email and passeword from the form using uncontrolled input field

  const handelOnOTPRequest = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    if (!email) {
      return toast.error("Email is required");
    }

    const pending = requestOTP(email);
    toast.promise(pending, {
      pending: "Please wait...",
    });

    const resp = await pending;
    setResponse(resp);
    setForm({email})
    resp.status === "success" && setShowOTP(false);
  };

  const handelOnChange = (e) => {
    const {name, value} = e.target 
    setForm({...form, [name] : value})
    //homework password validation
  }

  const handelOnPasswordReset = async(e) => {
    e.preventDefault();

    const {confirmPassword, ...rest} = form
    if(!rest.email || rest.password !== confirmPassword){
      return toast.error("Password does not match or email is not provided")
    }
    //call api and send data

    const pending = requestPassword(rest)
    toast.promise(pending, {
      pending: "Please wait..."
    } )

    const resp = await pending 
    setResponse(resp)

    resp.status === "success" && navigate("/")

  }
 
  const inputOTP = [
    {
      label: "Email",
      name: "email",
      required: true,
      placeholder: "Enter email address",
      forwardRef: emailRef,
    },
  ];

  const inputResetInput = [
    {
      label: "OTP",
      name: "otp",
      required: true,
      placeholder: "Enter OPT ",
    },

    {
      label: "Password",
      name: "password",
      type: "password",
      required: true,
      placeholder: "Enter password",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      required: true,
      placeholder: "Enter Confirm password",
    },
  ];
  return (
    <div>
      <div className="mt-5 text-center ">
        <h1> Tech Gear Admin CMS</h1>
      </div>
      <hr />

      {response.message && (
        <Alert variant={response.status === "success" ? "success" : "danger"}>
          {response.message}
        </Alert>
      )}

      {showOTP && (
        <Form
          className="m-auto border rounded shadow-lg p-3 mt-5"
          style={{ width: "500px" }}
          onSubmit={handelOnOTPRequest}
        >
          <div>
            <h4>Request OTP to reset password</h4>
          </div>
          <hr />
          {inputOTP.map((item, i) => (
            <CustomInput key={i} {...item} />
          ))}

          <div className="d-grid">
            <Button type="submit">Request OTP</Button>
          </div>

          <div className="mt-4 text-end">
            <a href="/"> login</a>
          </div>
        </Form>
      )}

      {!showOTP && (
        <Form
          className="m-auto border rounded shadow-lg p-3 mt-5"
          style={{ width: "500px" }}
          onSubmit={handelOnPasswordReset}
        >
          <div>
            <h4>Reset Your Password</h4>
          </div>
          <hr />
          {inputResetInput.map((item, i) => (
            <CustomInput key={i} {...item} onChange = {handelOnChange}/>
          ))}

          <div className="d-grid">
            <Button type="submit">Update Password</Button>
          </div>

          <div className="mt-4 text-end">
            Ready to Sign In? <a href="/"> Sign In</a> <br />
          </div>
        </Form>
      )}
    </div>
  );
};

export default ResetPassword;
