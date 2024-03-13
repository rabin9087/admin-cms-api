import { Button, Form } from "react-bootstrap";
import AdminLayout from "../../components/layout/AdminLayout";
import CustomInput from "../../components/customs/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCategoriesAction } from "../category/categoryAction";
import { getAProductsAction, updatedAProductAction } from "./productAction";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [form, setForm] = useState({});
  const [images, setImages] = useState([]);
  const [imgToDelete, setImgToDelete] = useState([]);
  const navigate = useNavigate();

  const { _id } = useParams();

  const dispatch = useDispatch();
  const { catList } = useSelector((state) => state.catInfo);
  const { selectedProduct } = useSelector((state) => state.productInfo);

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    _id !== form._id && dispatch(getAProductsAction(_id));
    setForm(selectedProduct);
  }, [dispatch, form._id, selectedProduct, _id]);

  const handelOnSubmit = (e) => {
    e.preventDefault();

    const { createdAt, sku, slug, __v, updatedAt, ...rest } = form;
    const formDt = new FormData();

    for (let key in rest) {
      formDt.append(key, rest[key]);
    }
    console.log(images);
    if (images.length) {
      [...images].forEach((item) => {
        formDt.append("newImages", item);
      });
    }

    imgToDelete.length && formDt.append("imgToDelete", imgToDelete);

    dispatch(updatedAProductAction(_id, formDt));
    // && navigate("/product");
  };

  const handelOnChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handelOnImageAttach = (e) => {
    const { files } = e.target;
    setImages(files);
  };

  const handelOnDeleteImg = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);
    if (checked) {
      setImgToDelete([...imgToDelete, value]);
    } else {
      setImgToDelete(imgToDelete.filter((url) => url != value));
    }
    setImages;
  };

  const input = [
    {
      label: "Product Name",
      name: "name",
      required: true,
      placeholder: "Enter the Product Name",
      value: form.name,
    },
    {
      label: "Slug",
      name: "sulg",
      required: true,
      disabled: true,
      value: form.slug,
    },
    {
      label: "SKU",
      name: "sku",
      required: true,
      disabled: true,
      placeholder: "Enter SKU of Product",
      value: form.sku,
    },
    {
      label: "QTY",
      name: "qty",
      type: "number",
      required: true,
      placeholder: "Enter Qunatity of Product",
      value: form.qty,
    },
    {
      label: "Size",
      name: "sizes",
      type: "text",
      required: true,
      placeholder: "Enter All Product sizes",
      value: form.sizes,
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      required: true,
      placeholder: "Enter price of Product",
      value: form.price,
    },
    {
      label: "Sales Price",
      name: "salesPrice",
      type: "number",
      placeholder: "Enter sales Price",
      value: form.salesPrice,
    },
    {
      label: "Sales Start Date",
      name: "salesStartDate",
      type: "date",
      placeholder: "Enter Sale Start Date",
      value: form?.salesStartStart?.slice(10),
    },
    {
      label: "Sales End Date",
      name: "salesEndDate",
      type: "date",
      placeholder: "Enter Sale End Date",
      value: form?.salesEndStart?.slice(10),
    },
    {
      label: "Description",
      name: "description",
      as: "textarea",
      rows: "5",
      required: true,
      placeholder: "Enter product description",
      value: form.description,
    },
  ];

  return (
    <AdminLayout title={"Edit Product"}>
      <Link to={"/product"}>
        <Button variant="secondary"> &lt; Back</Button>
      </Link>
      <div className="mt-5">
        <h1> Edit Product</h1>
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
              <option
                selected={item._id === form.parentCatId}
                key={item._id}
                value={item._id}
              >
                {item.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {input.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handelOnChange} />
        ))}

        {/* handeling the attachemnet */}
        <div className="d-flex gap-3 m-4">
          {form?.images?.map((url) => (
            <div key={url}>
              <div className="">
                <input
                  type="radio"
                  name="thumbnail"
                  id={url}
                  checked={url === form.thumbnail}
                  value={url}
                  onChange={handelOnChange}
                />{" "}
                <label htmlFor={url}>Make Thumbnail</label>
              </div>
              <div className="">
                <input
                  type="checkbox"
                  id={url}
                  onChange={handelOnDeleteImg}
                  value={url}
                />
                <label htmlFor={url + 1}>Delete</label>
              </div>
              <img
                className="thumbnail"
                width={"80px"}
                height={"100px"}
                src={url}
              />
            </div>
          ))}
        </div>
        {/* 
        {images?.length > 0 &&
          images.map((item, i) => (
            <div key={i}>
              <img
                className="thumbnail"
                width={"80px"}
                height={"100px"}
                src={item}
              />
            </div>
          ))}
 */}
        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            name="img"
            multiple
            onChange={handelOnImageAttach}
          />
        </Form.Group>

        <div className="d-grid">
          <Button type="submit">Update Product</Button>
        </div>
      </Form>
    </AdminLayout>
  );
};

export default EditProduct;
