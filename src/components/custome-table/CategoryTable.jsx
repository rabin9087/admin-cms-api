import { useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAction } from "../../pages/category/categoryAction";
import { Link } from "react-router-dom";

const CategoryTable = () => {
  const dispatch = useDispatch();
  const { catList } = useSelector((state) => state.catInfo);

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
        </tr>
      </thead>
      <tbody>
        {catList.map(({ _id, status, title, slug, createdAt }, i) => (
          <tr key={_id}>
            <td>{i + 1}.</td>
            <td
              className={status === "active" ? "text-success" : "text-danger"}
            >
              {status}
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CategoryTable;
