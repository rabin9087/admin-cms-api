import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Alert from "react-bootstrap/Alert";
import CustomInput from "../customs/CustomInput";
import { useState } from "react";
import { toast } from "react-toastify";
import { updatePassword } from "../../helpers/axiosHelper/users/userAxios";

const initialState= {
  oldPassword: "",
  newPassword: "",
  confirmPassword: ""
}

const UpdatePasswordForm = () => {
  const [form, setForm] = useState(initialState)

  const handelOnPasswordUpdateSubmit = async(e) => {
    e.preventDefault()
    const {confirmPassword, ...rest} = form
    if(confirmPassword !== rest.newPassword){
      return toast.error("Password does not match")
    }

    const pending = updatePassword(rest)
    toast.promise(pending, {
      pending: "Please wait..."
    })

    const {status, message} = await pending
    toast[status](message)
    status ==="success" && setForm(initialState)
  }
  const handelOnChange = (e) => {
    const {name, value} = e.target
    //apply strong password validation
    setForm({...form, [name]: value}) 
  }
  const input= [
    {
      label: "Current Password",
      name: "oldPassword",
      type: "password",
      required: true,
      placeholder: "xxxxxxxxxx ",
    },

    {
      label: "New Password",
      name: "newPassword",
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
    <div className="mb-4 p-3">
      <Form
          onSubmit={handelOnPasswordUpdateSubmit}
        >

          {input.map((item, i) => (
            <CustomInput key={i} {...item} onChange = {handelOnChange}/>
          ))}

          <div className="d-grid">
            <Button variant="danger" type="submit">Update Password</Button>
          </div>
        </Form>
    </div>
  )
}

export default UpdatePasswordForm
