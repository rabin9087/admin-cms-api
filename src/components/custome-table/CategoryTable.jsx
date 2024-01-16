import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";

const CategoryTable = () => {
  const { catList } = useSelector((state) => state.catInfo);
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
        {catList.map(({_id, status, title, slug, createdAt}, i) => (
          <tr key={_id}>
            <td>{i +1}.</td>
            <td className={status === "active" ? "text-success" : "text-danger" }>{status}</td>
            <td>{title}</td>
            <td>{slug}</td>
            <td>{createdAt?.slice(0,10)}</td>
            <td className="d-grid">
              <Button variant="warning">Edit</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CategoryTable;
