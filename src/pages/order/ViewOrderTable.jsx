import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAOrderAction } from "./orderAction";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import AdminLayout from "../../components/layout/AdminLayout";

import { openModal } from "../../store/modal.slice";
import { updateDispatchedOrder } from "./orderSlice";

const ViewOrderTable = () => {
  const dispatch = useDispatch();

  const { _id } = useParams();
  const orderID = _id;
  const { order } = useSelector((state) => state.orderInfo);
  const { items, address, amount, pay, ...rest } = order;

  const handelOnDelivery = async (orderID, updatingData) => {
    const newData = items.map((item) => {
      const { _id, ...rest } = item;
      const deliveryStatus =
        rest.deliveryStatus === "Delivered" ? "Not Delivered Yet" : "Delivered";
      if (_id._id === updatingData._id) {
        return { ...rest, deliveryStatus, _id: _id._id };
      }
      return { ...rest, _id: _id._id };
    });

    dispatch(
      openModal({
        heading: "Update",
        content: "Are you sure want to update this order?",
        data: newData,
        id: orderID,
      })
    );
  };
  const decrement = (dispatchedNumber, _id) => {
    const dispatchedQty = dispatchedNumber - 1;
    if (dispatchedQty >= 0) {
      dispatch(updateDispatchedOrder({ _id, dispatchedQty }));
    }
  };

  const increment = (dispatchedNumber, _id, orderQty) => {
    const dispatchedQty = dispatchedNumber + 1;

    if (dispatchedQty <= orderQty) {
      dispatch(updateDispatchedOrder({ _id, dispatchedQty }));
    }
  };

  useEffect(() => {
    dispatch(getAOrderAction(_id));
  }, [_id, dispatch]);
  return (
    <AdminLayout title={"Product Details "}>
      <Link to={"/orders"}>
        <Button variant="secondary"> &lt; Back</Button>
      </Link>

      <div className="mt-2 ">
        <Container fluid className="mb-4">
          <Row>
            <Col>
              <div>
                <h3>Customer Details </h3>
                <div>
                  <span>Name: {address?.name}</span> <br />
                  <span>Email: {address?.email}</span>
                  <br />
                  <span>Phone: {address?.phone}</span>
                  <br />
                  <span>
                    Address:{" "}
                    {address?.address?.line2
                      ? address?.address?.line2 + "/"
                      : ""}
                    {address?.address?.line1}, {address?.address?.city},
                    {address?.address?.state} {address?.address?.postal_code},{" "}
                    {address?.address?.country}
                  </span>{" "}
                  <br />
                </div>
              </div>
            </Col>
            <Col>
              <div className="">
                <h4>Amount: ${amount}</h4>
                <span>Payment Method Type: {pay?.payment_method_types[0]}</span>
                <br />
                <span>Order Date: {pay?.createdAt}</span>
              </div>
            </Col>
          </Row>
        </Container>

        <Table striped>
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Thumbnail</th>
              <th>Name</th>
              <th>Slug</th>
              <th>SKU</th>
              <th>Price/Item</th>
              <th>Ordered Quantity</th>
              <th>Items On Stock</th>
              <th>Size</th>
              <th>Size Available</th>
              <th>Delivery Status</th>
            </tr>
          </thead>
          <tbody className="">
            {items?.map(
              ({ _id, dispatchedQty, orderQty, size, deliveryStatus }, i) => (
                <tr key={_id._id} className="">
                  <td>{i + 1}.</td>

                  <td>
                    {" "}
                    <img
                      width={"60px"}
                      height={"70px"}
                      src={import.meta.env.VITE_SERVER_ROOT + _id.thumbnail}
                      className="thumbnail"
                    />
                  </td>
                  <td> {_id.name}</td>
                  <td>{_id.slug} </td>
                  <td>{_id.sku} </td>
                  <td>{_id.price}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center ps-2 pe-2 m-auto text-info rounded-lg">
                      Ordered: {orderQty}
                    </div>

                    <div className="d-flex justify-content-center align-items-center gap-2 mt-2 mb-2">
                      <Button
                        onClick={() => decrement(dispatchedQty, _id._id)}
                        type="button"
                      >
                        {" "}
                        -{" "}
                      </Button>
                      <div className="block">Supplied: </div>
                      <div className="d-flex">
                        <span>{dispatchedQty}</span>
                      </div>

                      <Button
                        onClick={() =>
                          increment(dispatchedQty, _id._id, orderQty)
                        }
                        type="button"
                      >
                        {" "}
                        +{" "}
                      </Button>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center">
                      {_id.qty}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex text-warning ">{size}</div>
                  </td>

                  <td className="p-2">
                    &#91;
                    {_id.sizes?.map((item, i) => (
                      <span key={i} className="">
                        {item},{" "}
                      </span>
                    ))}
                    &#93;
                  </td>

                  <td className="">
                    <div className=" d-flex justify-content-center align-items-center gap-2 mt-3 mb-2">
                      <Button
                        variant={
                          deliveryStatus === "Delivered" ? "success" : "danger"
                        }
                        onClick={() => handelOnDelivery(orderID, _id)}
                      >
                        {deliveryStatus}
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default ViewOrderTable;
