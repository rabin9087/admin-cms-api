import { useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Button } from "react-bootstrap";
import ProductTable from "../../components/custome-table/ProductTable";
import { Link } from "react-router-dom";

const Product = () => {
  useEffect(() => {});
  return (
    <AdminLayout title={"Product"}>
      <div className="text-end mt-4">
        <Link to={"/product/new"}>
          <Button>Add New Product</Button>
        </Link>
      </div>
      <div className="product-list">
        <ProductTable />
      </div>
    </AdminLayout>
  );
};

export default Product;
