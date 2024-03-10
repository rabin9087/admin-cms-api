import { Button, Col, Form, Row } from "react-bootstrap";
import CategoryTable from "../../components/custome-table/CategoryTable";
import AdminLayout from "../../components/layout/AdminLayout";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { postNewCategoryAction } from "./categoryAction";
import EditCategoryTable from "./EditCategoryTable";
import { Link } from "react-router-dom";

const EditCategory = () => {
  const titleRef = useRef("");
  const dispatch = useDispatch();

  const handelOnSubmit = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;

    if (window.confirm(`Are you sure want to add ${title} `)) {
      if (!title) {
        return toast.error("Title is missing");
      }
      dispatch(postNewCategoryAction({ title }));
    }
  };
  return (
    <AdminLayout title={"Edit Category"}>
      {/* form */}
      <Link to={"/category"}>
        <Button variant="secondary"> &lt; Back</Button>
      </Link>
      <div className="mt-5">
        <h1> Edit Category</h1>
      </div>
      <hr />
      <div>
        <EditCategoryTable />
      </div>
    </AdminLayout>
  );
};

export default EditCategory;
