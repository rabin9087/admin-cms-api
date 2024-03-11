import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderAction } from "../order/orderAction";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const OrdersChart = ({ toolTips }) => {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.orderInfo);
  const delivered = orderList.filter(
    (item) => item.deliveryStatus === "Delivered"
  );
  const NotDelivered = orderList.filter(
    (item) => item.deliveryStatus === "Not Delivered Yet"
  );

  const deliveryStatus = [
    {
      name: "Delivery Status",
      TotalOrder: orderList.length,
      Delivered: delivered.length,
      NotDeliveredYet: NotDelivered.length,
    },
  ];

  useEffect(() => {
    dispatch(getAllOrderAction());
  }, [dispatch]);
  return (
    <ResponsiveContainer width="90%" aspect={2} className="ps-3">
      <BarChart width={"30%"} data={deliveryStatus}>
        {/* <CartesianGrid strokeDasharray={"5 5"} /> */}
        {toolTips}
        <Legend />
        <XAxis dataKey={"name"} interval={"preserveStartEnd"} />
        <YAxis />
        <Bar dataKey="TotalOrder" stroke="red" fill="blue" />
        <Bar dataKey="Delivered" stroke="red" fill="green" />
        <Bar dataKey="NotDeliveredYet" stroke="red" fill="red" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OrdersChart;
