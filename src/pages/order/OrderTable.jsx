import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrderAction } from "./orderAction";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { updateDeliveryStatus } from "../../helpers/axiosHelper/order/OrderAxios";
const OrderTable = () => {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.orderInfo);
  useEffect(() => {
    dispatch(getAllOrderAction());
  }, [dispatch]);

  useEffect(() => {
    const updateDelivery = async () => {
      orderList.map(async ({ _id, items }) => {
        const filter = items.filter(
          (item) => item.deliveryStatus === "Delivered"
        );
        if (filter.length === items.length) {
          await updateDeliveryStatus(_id, { deliveryStatus: "Delivered" });
        } else {
          await updateDeliveryStatus(_id, {
            deliveryStatus: "Not Delivered Yet",
          });
        }
        return;
      });
    };
    updateDelivery();
  }, [orderList]);

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
            <th>Delete</th>
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
                <td>{i + 1}.</td>

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
                <td className="flex justify-content-center align-items-center">
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
                  <div className="d-flex align-items-center ">
                    <Button className="text-danger m-2" variant="light">
                      <RiDeleteBin6Line />
                    </Button>
                  </div>
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
