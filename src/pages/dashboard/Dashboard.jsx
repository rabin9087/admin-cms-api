import { Col, Container, Row, Tooltip } from "react-bootstrap";
import AdminLayout from "../../components/layout/AdminLayout";
import OrdersChart from "./OrdersChart";

const Dashboard = () => {
  return (
    <AdminLayout title={"Dashboard"}>
      <Container fluid className="">
        <Row className="">
          <Col lg={12} xxl={6} className="">
            <OrdersChart
              toolTips={
                <Tooltip contentStyle={{ backgroundColor: "yellow" }} />
              }
            />
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default Dashboard;
