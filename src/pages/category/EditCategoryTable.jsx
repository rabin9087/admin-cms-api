import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategoriesAction,
  getAllCategoriesByIdAction,
} from "./categoryAction";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CustomInput from "../../components/customs/CustomInput";
import { updateCategories } from "../../helpers/axiosHelper/category/categoryAxiso";

const EditCategoryTable = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.catInfo);
  const { _id } = useParams();
  const [form, setForm] = useState(category);

  const handelOnUpdate = async (title) => {
    console.log(form);
    if (window.confirm(`Are you sure want to update ${title} category?`)) {
      await updateCategories(form);
    }
  };

  useEffect(() => {
    dispatch(getAllCategoriesAction(_id));
  }, [dispatch, _id]);

  const input = [
    {
      label: "Category Title",
      name: "name",
      required: true,
      placeholder: "Enter the Category Title",
      value: form.title,
    },
    {
      label: "Slug",
      name: "sulg",
      required: true,
      disabled: true,
      value: form.slug,
    },
  ];

  const handelOnChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    dispatch(getAllCategoriesByIdAction(_id));
  }, [dispatch, _id]);

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Select Status</Form.Label>
          <Form.Select name="parentCatId" onChange={handelOnChange}>
            <option value="">-- select --</option>
            <option
              selected={form._id === form.parentCatId}
              key={form._id}
              value={"active"}
            >
              Active
            </option>
            <option
              selected={form._id === form.parentCatId}
              key={form._id}
              value={form.status}
            >
              InActive
            </option>
          </Form.Select>
        </Form.Group>
        {input.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handelOnChange} />
        ))}
        <div className="d-grid m-4">
          <Button onClick={() => handelOnUpdate(form.title)}>Update</Button>
        </div>
      </Form>
    </div>
  );
};

export default EditCategoryTable;
