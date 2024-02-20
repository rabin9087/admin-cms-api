import { useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../../pages/product/productAction";
import { Link } from "react-router-dom";

const ProductTable = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.productInfo);

  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  return (
    <>
      <div>{productList.length} Products found!</div>
      <Table striped>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Thumbnail</th>
            <th>Status</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Sales Price</th>
            {/* <th>Sales Starts</th>
          <th>Sales End</th> */}
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {productList.map(
            (
              { _id, thumbnail, status, name, slug, qty, price, salesPrice },
              i
            ) => (
              <tr key={_id}>
                <td>{i + 1}.</td>
                <td>
                  <img
                    width={"80px"}
                    height={"100px"}
                    src={import.meta.env.VITE_SERVER_ROOT+ thumbnail}
                    className="thumbnail"
                  />
                </td>
                <td
                  className={
                    status === "active" ? "text-success" : "text-danger"
                  }
                >
                  {status}
                </td>
                <td>
                  Name: {name} <br /> Slug: {slug}
                </td>
                <td>{qty}</td>
                <td>{price}</td>
                <td>{salesPrice}</td>

                <td className="flex">
                  <Link to={`/product/edit/${_id}`}>
                    <Button variant="warning">Edit</Button>
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </>
  );
};

export default ProductTable;
