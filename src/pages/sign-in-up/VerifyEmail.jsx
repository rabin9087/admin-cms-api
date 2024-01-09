import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { useSearchParams } from "react-router-dom";
import { postverifyEmail } from "../../helpers/axiosHelper/users/userAxios";

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
    const response = await postverifyEmail({ associate, token });
    console.log(response);
    setShowSpinner(false);
    setResp(response);
  };

  return (
    <div>
      <div className="text-center">Tech Gare Admin CMS</div>
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
    </div>
  );
};

export default VerifyEmail;
