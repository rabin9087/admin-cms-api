import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductsByCatId,
  getAllProductsAction,
  updateProductStatusAction,
} from "../../pages/product/productAction";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import CustomPagination from "../pagination/CustomPagination";

const ProductTable = ({ catId }) => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const { productList, length } = useSelector((state) => state.productInfo);

  const handelOnStatusUpdate = (e) => {
    const { value, checked } = e.target;
    dispatch(
      updateProductStatusAction({
        _id: value,
        status: checked ? "active" : "inactive",
      })
    );
  };

  useEffect(() => {
    catId === "All"
      ? dispatch(getAllProductsAction({ number: (pageNumber - 1) * 5 }))
      : dispatch(fetchAllProductsByCatId({ catId, number: pageNumber * 5 }));
  }, [dispatch, catId, pageNumber]);

  return (
    <div className="productTable">
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
                <td>{i + 1 + (pageNumber - 1) * 5}.</td>
                <td>
                  <img
                    width={"80px"}
                    height={"100px"}
                    // src={import.meta.env.VITE_ROOT_API + thumbnail}
                    src={thumbnail}
                    className="thumbnail"
                  />
                </td>

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
                <td>
                  Name: {name} <br /> Slug: {slug}
                </td>
                <td>{qty}</td>
                <td>${price}</td>
                <td>{salesPrice > 0 ? salesPrice : "Not in Sale"}</td>

                <td className="">
                  <Link to={`/product/edit/${_id}`}>
                    <Button variant="warning" className="h-100">
                      Edit
                    </Button>
                  </Link>
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

export default ProductTable;
