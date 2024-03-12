import CustomInput from "../../components/customs/CustomInput";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { toast } from "react-toastify";
import { postNewAdmin } from "../../helpers/axiosHelper/users/userAxios";
const SignUp = () => {
  const [form, setForm] = useState({});
  const [passwordValidationError, setPasswordValidationError] = useState("");

  const handelOnChange = (e) => {
    const { name, value } = e.target;

    setPasswordValidationError("");
    if (name === "password") {
      value.length < 6 &&
        setPasswordValidationError("Must be longer than 6 chars");
      !/[A-Z]/.test(value) &&
        setPasswordValidationError("Must inclue uppercase");

      !/[a-z]/.test(value) &&
        setPasswordValidationError("Must inclue lowercase");

      !/[0-9]/.test(value) && setPasswordValidationError("Must inclue number");
    }

    if (name === "confirmPasword") {
      form.password !== value &&
        setPasswordValidationError("Password does not match");
    }

    setForm({ ...form, [name]: value });
  };

  const handelOnSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) {
      toast.error("Password does not match ");
      return;
    }
    const userPending = postNewAdmin(rest);

    toast.promise(userPending, {
      pending: "Please wait...",
    });

    const { status, message } = await userPending;
    console.log(status, message);
    toast[status](message);
  };

  const input = [
    {
      label: "First Name",
      name: "fName",
      required: true,
      placeholder: "Enter first name",
    },
    {
      label: "Last Name",
      name: "lName",
      required: true,
      placeholder: "Enter Last name",
    },
    {
      label: "Email",
      name: "email",
      required: true,
      placeholder: "Enter email name",
    },
    {
      label: "Phone",
      name: "phone",
      placeholder: "Enter Phone number",
    },
    {
      label: "Address",
      name: "address",
      placeholder: "Enter your address",
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
      placeholder: "Enter confirm password",
    },
  ];

  return (
    <div>
      <div className="mt-5 text-center ">
        <h1> Cricket Gear Admin CMS</h1>
      </div>
      <hr />
      <Form
        className="m-auto border rounded shadow-lg p-3 mt-5"
        style={{ width: "500px" }}
        onSubmit={handelOnSubmit}
      >
        <h3>Admin signup</h3>
        <hr />
        {input.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handelOnChange} />
        ))}

        <div className="">
          {passwordValidationError && (
            <div className="text-danger fw-bold p-3">
              {passwordValidationError}
            </div>
          )}
        </div>
        <div className="d-grid">
          <Button type="submit" disabled={passwordValidationError}>
            Sign up
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
