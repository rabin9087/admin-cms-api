import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategoriesAction,
  updateCategoriesStatusAction,
} from "../../pages/category/categoryAction";
import { Link } from "react-router-dom";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { deleteCategoriesById } from "../../helpers/axiosHelper/category/categoryAxiso";

const CategoryTable = () => {
  const dispatch = useDispatch();
  const { catList } = useSelector((state) => state.catInfo);

  const handelOnStatusUpdate = (e) => {
    const { value, checked } = e.target;

    dispatch(
      updateCategoriesStatusAction({
        _id: value,
        status: checked ? "active" : "inactive",
      })
    );
  };

  const handelOnDelete = async (_id, title) => {
    if (window.confirm(`Are you sure want to delete ${title} category?`)) {
      const deleteCategory = await deleteCategoriesById(_id);
      return deleteCategory;
    }
  };

  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [dispatch]);
  return (
    <Table striped>
      <thead>
        <tr>
          <th>S.N.</th>
          <th>Status</th>
          <th>Title</th>
          <th>Slug</th>
          <th>Created</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {catList.map(({ _id, status, title, slug, createdAt }, i) => (
          <tr key={_id}>
            <td>{i + 1}.</td>

            <td
              className={status === "active" ? "text-success" : "text-danger"}
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
            <td>{title}</td>
            <td>{slug}</td>
            <td>{createdAt?.slice(0, 10)}</td>
            <td className="d-grid">
              <Link to={`/category/${_id}`}>
                <Button className="w-full" variant="warning">
                  Edit
                </Button>
              </Link>
            </td>
            <td>
              <div className="text-danger">
                <Button
                  className="w-full"
                  variant="light"
                  onClick={() => handelOnDelete(_id, title)}
                >
                  <RiDeleteBin6Fill />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CategoryTable;
