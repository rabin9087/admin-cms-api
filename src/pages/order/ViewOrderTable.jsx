import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAOrderAction } from "./orderAction";
import { Link, useParams } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import AdminLayout from "../../components/layout/AdminLayout";
const ViewOrderTable = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const { order } = useSelector((state) => state.orderInfo);
  console.log(order);

  const { items, address } = order;
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
                  thumbnail,
                  name,
                  slug,
                  sku,
                  price,
                  orderQty,
                  qty,
                  size,
                  sizes,
                },
                i
              ) => (
                <tr key={_id}>
                  <td>{i + 1}.</td>

                  <td>
                    {" "}
                    <img
                      width={"60px"}
                      height={"70px"}
                      src={import.meta.env.VITE_SERVER_ROOT + thumbnail}
                      className="thumbnail"
                    />
                  </td>
                  <td>{name}</td>
                  <td>{slug} </td>
                  <td>{sku} </td>
                  <td>{price}</td>
                  <td>{orderQty}</td>
                  <td>{qty}</td>
                  <td>{size}</td>

                  <td>
                    &#91;
                    {sizes?.map((item, i) => (
                      <span key={i}>{item}, </span>
                    ))}
                    &#93;
                  </td>

                  <td className="flex">
                    <Link to={`/orders/${_id}`}>
                      <Button variant="danger">  Deliver</Button>
                    </Link>
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
