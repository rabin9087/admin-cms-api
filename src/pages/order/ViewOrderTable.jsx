import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAOrderAction } from "./orderAction";
import { Link, useParams } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import AdminLayout from "../../components/layout/AdminLayout";

import { openModal } from "../../store/modal.slice";

const ViewOrderTable = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const orderID = _id;
  const { order } = useSelector((state) => state.orderInfo);
  const { items, address } = order;
  const handelOnDelivery = (orderID, updatingData) => {
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

  useEffect(() => {
    dispatch(getAOrderAction(_id));
  }, [dispatch, _id]);
  return (
    <AdminLayout title={"Product Details "}>
      <Link to={"/orders"}>
        <Button variant="secondary"> &lt; Back</Button>
      </Link>
      <div className="mt-2">
        <div className="mb-4">
          Customer Details
          <div>
            <span>Name: {address?.name}</span> <br />
            <span>Email: {address?.email}</span>
            <br />
            <span>
              Address:{" "}
              {address?.address?.line2 ? address?.address?.line2 + "/" : ""}
              {address?.address?.line1}, {address?.address?.city},
              {address?.address?.state} {address?.address?.postal_code},{" "}
              {address?.address?.country}
            </span>{" "}
            <br />
          </div>
        </div>
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
          <tbody>
            {items?.map(
              (
                {
                  _id,

                  orderQty,
                  size,
                  deliveryStatus,
                },
                i
              ) => (
                <tr key={_id._id}>
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
                  <td>{_id.name}</td>
                  <td>{_id.slug} </td>
                  <td>{_id.sku} </td>
                  <td>{_id.price}</td>
                  <td>{orderQty}</td>
                  <td>{_id.qty}</td>
                  <td>{size}</td>

                  <td className="">
                    &#91;
                    {_id.sizes?.map((item, i) => (
                      <span key={i} className="">
                        {item},{" "}
                      </span>
                    ))}
                    &#93;
                  </td>

                  <td className="flex">
                    <Button
                      variant={
                        deliveryStatus === "Not Delivered Yet"
                          ? "danger"
                          : "success"
                      }
                      onClick={() => handelOnDelivery(orderID, _id)}
                    >
                      {deliveryStatus}
                    </Button>
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
