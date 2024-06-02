import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrderAction } from "./orderAction";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import CustomPagination from "../../components/pagination/CustomPagination";
const OrderTable = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const { orderList, length } = useSelector((state) => state.orderInfo);
  useEffect(() => {
    dispatch(getAllOrderAction({ number: (pageNumber - 1) * 5 }));
  }, [dispatch, pageNumber]);

  const orderStatus = [
    { status: "Received", value: "received" },
    { status: "Processing", value: "processing" },
    { status: "On The Way", value: "on the way" },
    { status: "Delivered", value: "delivered" },
  ];

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>S.N.</th>
            {/* <th>Status</th> */}
            <th>Customer_Details</th>
            <th>Street</th>
            <th>Suburb</th>
            <th>Post_Code</th>
            <th>State</th>
            <th>Country</th>
            <th>Delivered_status</th>
            <th>Number_of_Products</th>
            <th>Paid_Status</th>
            <th>View_Orders</th>
            <th>Order_Status</th>
          </tr>
        </thead>
        <tbody className="">
          {orderList?.map(
            (
              {
                _id,
                address,
                items,
                pay,
                deliveryStatus,
                // createdAt,
                // updatesAt,
              },
              i
            ) => (
              <tr key={_id}>
                <td>{i + 1 + (pageNumber - 1) * 5}.</td>

                <td>
                  <span>Name:</span> {address?.name} <br />
                  Email: {address?.email} <br />
                  Phone: {address?.phone} <br />
                </td>
                <td>
                  {address?.address?.line2 ? address?.address?.line2 + "/" : ""}
                  {address?.address?.line1}{" "}
                </td>
                <td>{address?.address?.city}</td>
                <td>{address?.address?.postal_code}</td>
                <td>{address?.address?.state}</td>
                <td> {address?.address?.country}</td>
                <td
                  className={
                    deliveryStatus === "Delivered"
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {deliveryStatus}
                </td>
                <td className="">
                  <span className="d-flex justify-content-between text-success ps-2 pe-2 rounded">
                    <span>Delivered: </span>
                    {
                      items.filter(
                        (item) => item.deliveryStatus === "Delivered"
                      ).length
                    }{" "}
                  </span>
                  <span className="d-flex justify-content-between text-danger ps-2 pe-2 rounded">
                    <span>Not Delivered: </span>
                    {
                      items.filter(
                        (item) => item.deliveryStatus === "Not Delivered Yet"
                      ).length
                    }
                  </span>

                  <span className="d-flex justify-content-between text-info ps-2 pe-2 rounded">
                    <span> Total:</span>
                    {items.length}
                  </span>
                </td>
                <td
                  className={
                    pay.status === "succeeded" ? "text-success" : "text-danger"
                  }
                >
                  {pay.status === "succeeded" ? "Paid" : "Not Paid"}
                </td>
                <td className="">
                  <Link to={`/orders/${_id}`}>
                    <Button
                      variant={
                        deliveryStatus === "Delivered" ? "success" : "danger"
                      }
                    >
                      {" "}
                      View
                    </Button>
                  </Link>
                </td>
                <td className="">
                  <div className="d-flex align-items-center text-dark">
                    <select className="w-2/3 md:w-1/4 py-2 px-2.5 rounded-md mt-2 font-medium md:text-xl text-sm">
                      {orderStatus.map(({ status, value }, i) => (
                        <option key={i} className="py-2 px-2" value={value}>
                          {status}
                        </option>
                      ))}
                    </select>

                    {/* <Button className="text-danger m-2" variant="light">
                      <RiDeleteBin6Line />
                    </Button> */}
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
      <div className="d-flex justify-items-center justify-content-center">
        <CustomPagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          lastPage={Math.ceil(length / 5)}
        />
      </div>
    </div>
  );
};

export default OrderTable;
