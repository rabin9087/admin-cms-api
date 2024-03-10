import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomersAction } from "./customerAction";

const CustomerTable = () => {
  const dispatch = useDispatch();
  const { customerList } = useSelector((state) => state.customerInfo);
  const { numberOfOrder } = useSelector((state) => state.orderInfo);
  useEffect(() => {
    dispatch(fetchAllCustomersAction());
  }, [dispatch]);

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Change Status</th>
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
                    <td>
                      <Form className="">
                        <Form.Check // prettier-ignore
                          type="switch"
                          id="custom-switch"
                          label={status === "active" ? "InActive" : "Active"}
                        />
                      </Form>
                    </td>

                    <td
                      className={
                        status === "active" ? "text-success" : "text-danger"
                      }
                    >
                      {status}
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
