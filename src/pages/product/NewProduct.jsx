import { Button, Form } from "react-bootstrap";
import AdminLayout from "../../components/layout/AdminLayout";
import CustomInput from "../../components/customs/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCategoriesAction } from "../category/categoryAction";
import { postAProductAction } from "./productAction";
import { Link, useNavigate } from "react-router-dom";

const NewProduct = () => {
  const [form, setForm] = useState({});
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { catList } = useSelector((state) => state.catInfo);

  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [dispatch]);

  const handelOnSubmit = (e) => {
    e.preventDefault();
    const formDt = new FormData();

    for (let key in form) {
      formDt.append(key, form[key]);
    }

    if (images.length) {
      [...images].forEach(async (item) => {
        // await convertBase64(item)
        formDt.append("images", item);
      });
    }
    dispatch(postAProductAction(formDt));
    //  && navigate("/product");
  };

  const handelOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handelOnImageAttach = async (e) => {
    const { files } = e.target;
    setImages(files);
  };
 

  const input = [
    {
      label: "Product Name",
      name: "name",
      required: true,
      placeholder: "Enter the Product Name",
    },
    {
      label: "SKU",
      name: "sku",
      required: true,
      placeholder: "Enter SKU of Product",
    },
    {
      label: "QTY",
      name: "qty",
      type: "number",
      required: true,
      placeholder: "Enter Qunatity of Product",
    },
    {
      label: "Size",
      name: "sizes",
      type: "text",
      required: true,
      placeholder: "Enter All Product sizes",
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      required: true,
      placeholder: "Enter price of Product",
    },
    {
      label: "Sales Price",
      name: "salesPrice",
      type: "number",
      placeholder: "Enter sales Price",
    },
    {
      label: "Sales Start Date",
      name: "salesStartDate",
      type: "date",
      placeholder: "Enter Sale Start Date",
    },
    {
      label: "Sales End Date",
      name: "salesEndDate",
      type: "date",
      placeholder: "Enter Sale End Date",
    },
    {
      label: "Description",
      name: "description",
      as: "textarea",
      rows: "5",
      required: true,
      placeholder: "Enter product description",
    },
  ];

  return (
    <AdminLayout title={"Product"}>
      <Link to={"/product"}>
        <Button variant="secondary"> &lt; Back</Button>
      </Link>
      <div className="mt-5">
        <h1> Add New Product</h1>
      </div>
      <hr />
      <Form
        className="mt-5 mb-5 ms-4"
        style={{ width: "500px" }}
        onSubmit={handelOnSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Label>Select Category</Form.Label>
          <Form.Select name="parentCatId" onChange={handelOnChange}>
            <option value="">-- select --</option>

            {catList.map((item) => (
              <option key={item._id} value={item._id}>
                {item.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {input.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handelOnChange} />
        ))}

        {/* handeling the attachemnet */}

        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            name="img"
            required={true}
            multiple
            onChange={handelOnImageAttach}
          />
        </Form.Group>
        <div className="d-grid">
          <Button type="submit">Add Product</Button>
        </div>
      </Form>
    </AdminLayout>
  );
};

export default NewProduct;
