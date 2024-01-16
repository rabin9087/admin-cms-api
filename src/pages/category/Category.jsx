import { Button, Col, Form, Row } from "react-bootstrap";
import CategoryTable from "../../components/custome-table/CategoryTable";
import AdminLayout from "../../components/layout/AdminLayout";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { postNewCategoryAction } from "./categoryAction";

const Category = () => {
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
    <AdminLayout title={"Category"}>
      {/* form */}
      <div>
        <h4>Add new Category</h4>
        <Form onSubmit={handelOnSubmit}>
          <Row className="p-4 g-2">
            <Col md={8}>
              <Form.Control
                required={true}
                placeholder="add New Category"
                ref={titleRef}
              />{" "}
            </Col>
            <Col md={4} className="d-grid">
              <Button type="submit">Add new Category</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
        <CategoryTable />
      </div>
    </AdminLayout>
  );
};

export default Category;
