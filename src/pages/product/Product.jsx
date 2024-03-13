import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Button, Form } from "react-bootstrap";
import ProductTable from "../../components/custome-table/ProductTable";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Product = () => {
  const { catList } = useSelector((state) => state.catInfo);
  const [catId, setCatId] = useState("All");

  return (
    <AdminLayout title={"Product"}>
      <div className="text-end mt-4">
        <Link to={"/product/new"}>
          <Button>Add New Product</Button>
        </Link>
      </div>
      <div>
        <div>
          <Form.Group controlId="formBasicSelect">
            <Form.Label>Select Category Type</Form.Label>
            <Form.Select
              as="select"
              value={catId}
              onChange={(e) => setCatId(e.target.value)}
            >
              <option value={"All"}>All</option>
              {catList.map(({ _id, title }) => (
                <option key={_id} value={_id}>
                  {title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
      </div>
      <div className="product-list">
        <ProductTable catId={catId} />
      </div>
    </AdminLayout>
  );
};

export default Product;
