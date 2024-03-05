import OrderTable from "./OrderTable";
import AdminLayout from "../../components/layout/AdminLayout"


const Order = () => {

  return (
   <AdminLayout title={"Order"}>
    {/* <div className="text-end mt-4">
        <Link to={"/product/new"}>
          <Button>Add New Product</Button>
        </Link>
      </div> */}
      <div className="order-list">
        <OrderTable />
      </div>
   </AdminLayout>
  )
}

export default Order
