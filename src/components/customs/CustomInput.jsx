import Form from "react-bootstrap/Form";

const CustomInput = ({ label, forwardRef, ...rest  }) => {
  return (
    <Form.Group className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control {...rest}  ref={forwardRef}/>
    </Form.Group>
  );
};

export default CustomInput;
