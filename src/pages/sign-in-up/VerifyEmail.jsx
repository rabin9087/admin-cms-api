import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { useSearchParams } from "react-router-dom";
import { postVerifyEmail } from "../../helpers/axiosHelper/users/userAxios";

//show spinner
//grab query strings from url
//call server with e and c
//remove spinnner and show message from server

const VerifyEmail = () => {
  const [useSearchParam] = useSearchParams();
  const [showSpinner, setShowSpinner] = useState(true);
  const [resp, setResp] = useState({});

  const associate = useSearchParam.get("e");
  const token = useSearchParam.get("c");

  useEffect(() => {
    userEmailVerification();

    //call axios helper to call api
  }, []);

  const userEmailVerification = async () => {
    const response = await postVerifyEmail({ associate, token });
    setShowSpinner(false);
    setResp(response);
  };

  return (
    <div>
      <div className="text-center">Cricket Gear Admin CMS</div>
      <hr />

      <div className="text-center mt-5">
        {showSpinner && <Spinner variant="primary" animation="border" />}
      </div>

      <Alert
        className="w-50 m-auto"
        variant={resp.status === "success" ? "success" : "danger"}
      >
        {resp.message}
      </Alert>

      {resp.status === "success" && <a href="/">Login</a>}
    </div>
  );
};

export default VerifyEmail;
