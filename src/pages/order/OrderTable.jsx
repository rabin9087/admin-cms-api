import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrderAction } from "./orderAction";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import ViewOrderTable from "./ViewOrderTable";
const OrderTable = () => {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.orderInfo);

  const [address] = orderList;
  console.log("Address", address);
  useEffect(() => {
    dispatch(getAllOrderAction());
  }, [dispatch]);
  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>S.N.</th>
            {/* <th>Status</th> */}
            <th>Customer Details</th>
            <th>Street</th>
            <th>Suburb</th>
            <th>Post Code</th>
            <th>State</th>
            <th>Country</th>
            <th>Delivered status</th>
            <th>Number of Products</th>
            <th>Paid Status</th>
            <th>View Orders</th>
            <th>Delivered</th>
          </tr>
        </thead>
        <tbody className="">
          {orderList?.map(
            ({ _id, address, items, pay, createdAt, updatesAt }, i) => (
              <tr key={_id}>
                <td>{i + 1}.</td>

                <td>
                  <span>Name:</span> {address?.name} <br />
                  Email: {address?.email} <br />
                </td>
                <td>
                  {address?.address?.line1}{" "}
                  {address?.address?.line2 ? address?.address?.line2 + "/" : ""}
                </td>
                <td>{address?.address?.city}</td>
                <td>{address?.address?.postal_code}</td>
                <td>{address?.address?.state}</td>
                <td> {address?.address?.country}</td>
                <td>Not Delivered Yet</td>
                <td>{items.length}</td>
                <td
                  className={
                    pay.status === "succeeded" ? "text-success" : "text-danger"
                  }
                >
                  {pay.status === "succeeded" ? "Paid" : "Not Paid"}
                </td>
                <td className="flex">
                  <Link to={`/orders/${_id}`}>
                    <Button variant="danger "> View</Button>
                  </Link>
                </td>
                <td className="bg-success bg-danger">
                  <FaCheck /> <ImCross />
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderTable;
