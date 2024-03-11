import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateUserStatusAction,
  fetchAllCustomersAction,
} from "./customerAction";

const CustomerTable = () => {
  const dispatch = useDispatch();
  const { customerList } = useSelector((state) => state.customerInfo);
  const { numberOfOrder } = useSelector((state) => state.orderInfo);

  const handelOnStatusUpdate = (e) => {
    const { value, checked } = e.target;
    dispatch(
      UpdateUserStatusAction({
        _id: value,
        status: checked ? "active" : "inactive",
      })
    );
  };
  useEffect(() => {
    dispatch(fetchAllCustomersAction());
  }, [dispatch]);

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Status</th>
            <th>Role</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Number of Order</th>
          </tr>
        </thead>
        <tbody className="">
          {customerList?.map(
            ({ _id, status, fName, lName, email, phone, address, role }, i) => {
              if (role === "user")
                return (
                  <tr key={_id} className="">
                    <td>{i + 1}.</td>

                    <td
                      className={
                        status === "active" ? "text-success" : "text-danger"
                      }
                    >
                      <Form>
                        <Form.Check // prettier-ignore
                          type="switch"
                          id="custom-switch"
                          value={_id}
                          label={status}
                          checked={status === "active"}
                          onChange={handelOnStatusUpdate}
                        />
                      </Form>
                    </td>
                    <td>{role}</td>
                    <td>
                      {" "}
                      {fName} {lName}
                    </td>
                    <td>{email} </td>
                    <td>{phone} </td>
                    <td>{address}</td>
                    <td>{numberOfOrder?.length}</td>
                  </tr>
                );
            }
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomerTable;
