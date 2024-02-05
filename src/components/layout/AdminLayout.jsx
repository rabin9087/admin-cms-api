import { Footer } from "./Footer";
// import { Header } from "./Header"
import { Container } from "react-bootstrap";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const AdminLayout = ({ title, children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="main">
        <Header />
        <Container>
          <div className="mt-3">
            <h3>{title}</h3>
            <hr />
            <div className="page-contain">{children}</div>
          </div>
        </Container>
        <div className="footer">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
