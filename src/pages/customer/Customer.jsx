import AdminLayout from "../../components/layout/AdminLayout";
import CustomerTable from "./CustomerTable";

const Customer = () => {
  return (
    <AdminLayout title={"Customers"}>
      <CustomerTable />
    </AdminLayout>
  );
};

export default Customer;
