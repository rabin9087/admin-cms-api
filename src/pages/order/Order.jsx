import OrderTable from "./OrderTable";
import AdminLayout from "../../components/layout/AdminLayout";

const Order = () => {
  return (
    <AdminLayout title={"Order"}>
      <div className="order-list">
        <OrderTable />
      </div>
    </AdminLayout>
  );
};

export default Order;
